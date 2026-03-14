# Cloud Infrastructure

This guide presents an overview of VTEX's infrastructure architecture, exploring its cloud resources and technical aspects.

## SaaS multi-tenancy

By adopting the Software as a Service (SaaS) model, VTEX eliminates the need to set up and maintain complex local infrastructure, which enables scalability, stability, and simplified access to advanced digital commerce features such as order management, product offerings in marketplaces, and flexible integrations.

A key element of our platform's architecture is multi-tenancy. Tenants refer to individual accounts that have access to the same platform infrastructure while keeping their data and configurations isolated and secure. VTEX's multi-tenant architecture enables us to serve multiple customers on a shared infrastructure, ensuring performance, scalability, and cost-effectiveness.

### Logical separation

With a multi-tenant architecture, tenants don't have exclusive resources, such as physically separate databases, but we guarantee logical separation. Our clients' information is contained in one account, isolated and protected from other accounts. There is no method of accessing data from different accounts since all our services require an explicit account specification and authorized credentials.

Each request belongs to a specific tenant (account) and is processed atomically, which means each request has its own lifecycle. This allows for elastic operation and scalability and improved performance.

### Constant evolution and growth

The implementation of new features and updates can take place across the entire platform, ensuring that all tenants can benefit from the latest enhancements.

With a single, shared code base and infrastructure, updates, bug fixes, and maintenance tasks are centralized, reducing the time and effort required to keep the platform running smoothly across all tenants.

## Microservices

Our core commerce capabilities consist of over 70 shared microservices. Unlike a monolithic solution of tightly integrated capabilities, our microservices are organized into distinct functional modules, such as Checkout, Promotions, Catalog, or Pricing services, each with its own responsibilities and APIs.

Each microservice has a lifecycle independent from others, including its environment, deployment, and codebase. This allows us to use the most appropriate technologies and design patterns for each case. Teams can deploy services independently, enabling continuous improvement and faster updates. Each microservice is independently scalable to meet increasing demand.

### Virtual Private Cloud (VPC)

Given our microservices architecture, it is common for an application to need to query others to process a request. To ensure good processing performance while also safeguarding against unwanted external access, the microservices run within the same Virtual Private Cloud (VPC) network — except in cases where an exclusive VPC is a legal or security prerequisite, as is the case with VTEX's Payment Gateway, with PCI certification.

Within the VPC, VTEX IO apps have access control based on policies that only allow access to necessary resources, thus ensuring greater security.

### Deployment strategy and change management

New features and fixes are introduced daily, in a smooth and seamless way. Over 12,000 upgrades are rolled out annually with minimal disruption to customer operations. There is an automatic update for all clients for patch and minor updates that do not impact backward compatibility.

Our deployment capacity is made possible by a robust architecture of microservices, each having its own independent lifecycle but operating within a unified, automated Continuous Delivery framework. Our CI/CD pipeline ensures seamless integration, testing, and deployment of code changes.

Blue/green deployment strategy ensures that any problems are detected with little production traffic (usually around 1%) by monitoring the system's metrics, and rollbacks are immediate since the previous environment still exists.

## REST APIs

Our REST APIs enable you to leverage and extend VTEX core commerce features to integrate with third-party solutions and deliver best-in-class experiences across a multitude of shopper touchpoints (headless mobile applications, chatbots, IoT integrations) and back office touchpoints (ERP, PIM, and WMS integrations).

Using our REST APIs with our development platform (VTEX IO) and data service (Master Data), you can expand the VTEX platform to address your unique business needs.

## Cloud-native

VTEX core commerce services utilize advanced cloud solutions. VTEX IO leverages containerization and clustering technologies to manage deployment, maintenance, and scaling processes.

Our cloud-native, multi-tenant SaaS solution allows tenants to run the same version of the platform and benefit from frequent and seamless upgrades as well as high scalability.

VTEX is an AWS Partner with Retail Competency, validated by AWS for building secure, high-performing, resilient, and efficient cloud infrastructure.

### Content delivery optimization

VTEX maintains CDN servers across multiple global regions. These servers deliver cached content from the closest location to the user, significantly reducing load times.

#### CDN

VTEX's Content Delivery Network (CDN) is a distributed network of servers strategically placed across various geographic locations. On VTEX, CDN redundancy ensures the availability and performance of our services.

Our CDN plays a crucial role in caching delivered content, particularly static content, ensuring superior performance for shoppers. Additionally, the CDN serves as the primary edge protection against DDoS attacks.

#### Router

A router performs operations on the platform that are common to all services, such as throttling and distributing requests to internal services. It acts as the single entry point in the VPC. As the traffic orchestrator, the router ensures control in change management, resulting in lower risks with progressive rollouts and quick rollback in case of failures.

#### Cache

VTEX employs caching across multiple layers, including HTTP, application, and database levels, ensuring greater speed and capacity in processing requests and consequently maintaining the platform's high availability.

### Scalability

Leveraging cloud technology and microservices enables us to efficiently manage and scale our resources based on demand, thanks to built-in features like autoscaling.

Our multi-tenant architecture ensures elastic scalability, allowing stores to easily adapt to changing business requirements and handle traffic peaks during events like Black Friday.

### Reliability

VTEX delivers high availability as defined in their SLA agreement. You can monitor the platform's stability in real time at [VTEX Status](https://status.vtex.com/).

VTEX provisions infrastructure automatically using Infrastructure as Code (IaC). Applications and microservices are autoscaled based on Latency and CPU usage metrics.

VTEX IO leverages containerization and clustering technologies to manage deployment, maintenance, and scaling processes.

#### Maintenance

All scheduled maintenance activities by VTEX are communicated beforehand through VTEX Status. Maintenance typically occurs once every 60 days and lasts about 2–3 hours during the late evening (EST) and outside of peak sales hours.

### Security

VTEX counts with a comprehensive cloud monitoring system, covering both internal environments and the edge, in line with the AWS Security Maturity Model. All events within our platform are routed to a Security Information and Event Management (SIEM) infrastructure.

#### Threat intelligence

VTEX conducts tenant-level monitoring across the surface web and dark web. This proactive approach allows us to quickly identify and address issues such as unauthorized exposure of keys or cloned pages.

#### Active resource monitoring and patch management

The platform implements active resource monitoring and patch management, keeping infrastructure up-to-date with the latest security patches and configurations.

---

Source: https://developers.vtex.com/docs/guides/cloud-infrastructure
