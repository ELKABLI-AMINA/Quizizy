-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 01, 2023 at 05:49 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--

-- --------------------------------------------------------

--
-- Table structure for table `quiz`
--

CREATE TABLE `quiz` (
  `id` int(11) NOT NULL,
  `questionnaire` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questionnaire`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `quiz`
--

INSERT INTO `quiz` (`id`, `questionnaire`) VALUES
(0, '[{\"question\":\" Why is AWS more economical than traditional data centers for applications with varying compute workloads?\",\"answer\":[\"Amazon EC2 costs are billed on a monthly basis\",\"Users retain full administrative access to their Amazon EC2 instances.\",\"Amazon EC2 instances can be launched on demand when needed.\",\"Users can permanently run enough instances to handle peak workloads.\"],\"correct\":3,\"Explication\":\"The ability to launch instances on demand when needed allows users to launch and terminate instances inresponse to a varying workload. This is a more economical practice than purchasing enough on-premises serversto handle the peak load \"},{\"question\":\"Which AWS service would simplify the migration of a database to AWS?\",\"answer\":[\"AWS Storage Gateway\",\"AWS Database Migration Service (AWS DMS)\",\"Amazon EC2\",\" Amazon AppStream 2.0\"],\"correct\":2,\"Explication\":\"AWS DMS helps users migrate databases to AWS quickly and securely. The source database remain  fully operational during the migration, minimizing downtime to applications that rely on the database. AWS DMS can migrate data to and from most widely used commercial and open-source databases.\"},{\"question\":\"Which AWS offering enables users to find, buy, and immediately start using software solutions in AWS environment?\",\"answer\":[\"AWS Config\",\"AWS OpsWorks\",\"AWS SDK\",\"AWS Marketplace\"],\"correct\":4,\"Explication\":\"AWS Marketplace is a digital catalog with thousands of software listings from independent software vendors that makes it easy to find, test, buy, and deploy software that runs on AWS.\"},{\"question\":\" Which AWS networking service enables a company to create a virtual network within AWS?\",\"answer\":[\"AWS Config\",\"Amazon Route 53\",\"AWS Direct Connect\",\"Amazon Virtual Private Cloud (Amazon VPC)\"],\"correct\":4,\"Explication\":\" Amazon VPC lets users provision a logically isolated section of the AWS Cloud where users can launch  AWS resources in a virtual network that they define.\"},{\"question\":\" Which of the following is an AWS responsibility under the AWS shared responsibility model?\",\"answer\":[\"Configuring third-party applications\",\"Maintaining physical hardware\",\"Securing application access and data\",\"Managing guest operating systems\"],\"correct\":2,\"Explication\":\"Maintaining physical hardware is an AWS responsibility under the AWS shared responsibility model.\"},{\"question\":\"  Which component of the AWS global infrastructure does Amazon CloudFront use to ensure low-late delivery?\",\"answer\":[\"AWS Regions\",\"Edge locations\",\"Availability\",\"Virtual Private\"],\"correct\":2,\"Explication\":\" To deliver content to users with lower latency, Amazon CloudFront uses a global network of points of presence (edge locations and regional edge caches) worldwide.\"},{\"question\":\" How would a system administrator add an additional layer of login security to a user\'s A Management Console?\",\"answer\":[\"Use Amazon Cloud Directory\",\"Audit AWS Identity and Access Management (IAM) roles\",\"Enable multi-factor authentication\",\"Enable AWS CloudTrail\"],\"correct\":3,\"Explication\":\"Multi-factor authentication (MFA) is a simple best practice that adds an extra layer of protection on top of a username and password. With MFA enabled, when a user signs in to an AWS Management Console, they will be prompted for their username and password (the first factor\\u2014what they know), as well as for an authentication code from their MFA device (the second factor\\u2014what they have). Taken together, these multiple factors provide increased security for AWS account settings and resources.\"},{\"question\":\"Which service can identify the user that made the API call when an Amazon EC2 instance is terminated?\",\"answer\":[\"AWS Trusted Advisor\",\"AWS CloudTrail\",\"AWS X-Ray\",\"AWS Identity and Access Management (AWS IAM)\"],\"correct\":2,\"Explication\":\"AWS CloudTrail helps users enable governance, compliance, and operational and risk auditing of their AWS accounts. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. Events include actions taken in the AWS Management Console, AWS Command Line Interface (CLI), and AWS SDKs and APIs.\"},{\"question\":\"Which service would be used to send alerts based on Amazon CloudWatch alarms?\",\"answer\":[\" Amazon Simple Notification Service (Amazon SNS)\",\"AWS CloudTrail\",\"AWS Trusted Advisor\",\"Amazon Route 53\"],\"correct\":1,\"Explication\":\"Amazon SNS and Amazon CloudWatch are integrated so users can collect, view, and analyze metrics for every active SNS. Once users have configured CloudWatch for Amazon SNS, they can gain better insight into the performance of their Amazon SNS topics, push notifications, and SMS deliveries.\"},{\"question\":\"Where can a user find information about prohibited actions on the AWS infrastructure?\",\"answer\":[\"AWS Trusted Advisor\",\"AWS Identity and Access Management (IAM)\",\"AWS Billing Console\",\"AWS Acceptable Use Policy\"],\"correct\":4,\"Explication\":\"The AWS Acceptable Use Policy provides information regarding prohibited actions on the AWS infrastructure.\"}]');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
