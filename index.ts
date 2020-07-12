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


const allVpcSubnets = vpc.privateSubnetIds.concat(vpc.publicSubnetIds);

// Create an EKS cluster inside of the VPC.
const cluster2 = new eks.Cluster("my-cluster", {
    vpcId: vpc.id,
    subnetIds: allVpcSubnets,
    nodeAssociatePublicIpAddress: false,
});

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;
