import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";


const vpc = new awsx.ec2.Vpc("custom-1", {
    cidrBlock: "172.16.0.0/16",
    subnets: [
        { type: "public" },
        { type: "private" },
        { type: "isolated", name: "db" },
        { type: "isolated", name: "redis" },
    ],
});

// Allocate a security group and then a series of rules:
const sg = new awsx.ec2.SecurityGroup("sg", { vpc });

// 1) inbound SSH traffic on port 22 from a specific IP address
sg.createIngressRule("ssh-access", {
    location: { cidrBlocks: [ "203.0.113.25/32" ] },
    ports: new awsx.ec2.TcpPorts(22),
    description: "allow SSH access to 203.0.113.25",
});

// 2) inbound HTTPS traffic on port 443 from anywhere
sg.createIngressRule("https-access", {
    location: new awsx.ec2.AnyIPv4Location(),
    ports: new awsx.ec2.TcpPorts(443),
    description: "allow HTTPS access from anywhere",
});

// 3) outbound TCP traffic on any port to anywhere
sg.createEgressRule("outbound-access", {
    location: new awsx.ec2.AnyIPv4Location(),
    ports: new awsx.ec2.AllTcpPorts(),
    description: "allow outbound access to anywhere",
});
