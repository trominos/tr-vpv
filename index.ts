import * as eks from "@pulumi/eks";
import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";


const vpc = new awsx.ec2.Vpc("custom", {
    cidrBlock: "172.16.0.0/16",
    subnets: [
        { type: "public" },
        { type: "private" },
        { type: "isolated", name: "db" },
        { type: "isolated", name: "redis" },
    ],
});


