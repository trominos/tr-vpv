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
const sg = new awsx.ec2.SecurityGroup("thisistestsg", { vpc });

