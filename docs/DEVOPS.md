# Devops Infrastructure

This describes the details around deployment and infrastructure.

Most importantly, details instructions for the updating the SSL certificate.

Uses:
* Kubernetes (LKE on Linode)
* Google Domains (domain registrar)
* Linode Domains (DNS service)

Current certificate:
* Current: made June 2, 2021
* Expires: on August 31, 2021 (3 months)

## Domain Name

Registered on Google Domains.

Then name servers are set to Linode name servers (e.g. `ns5.linode.com`)

Then we can add the domain in the Linode Domains dashboard and add DNS records.

## SSL/TLS Certificate

Generate a SSL certificate with CertBot/LetsEncrypt:
* Command `sudo certbot certonly --manual --preferred-challenges dns`

This will require us to set up a TXT record on our DNS.

We can check the DNS using:
* Command `dig -t TXT <subdomain>.plasmatech.dev`
* Or heading to https://dnschecker.org/#TXT/

We can view the key using:
```bash
sudo cat /etc/letsencrypt/live/plasmatech.dev/privkey.pem
sudo cat /etc/letsencrypt/live/plasmatech.dev/fullchain.pem
```

## K8 Pods

Deployment (for webservers)
* Configured to expose port 8080.
* Uses docker container `plasmatech8/plasmatech-webserver`

See [scripts/plasmatech_deployment.yaml](scripts/plasmatech_deployment.yaml)

## K8 Secret TLS

After generating our SSL certificate, we can create a secret:

```bash
# sudo cp /etc/letsencrypt/live/plasmatech.dev/privkey.pem ./privkey.pem
# sudo cp /etc/letsencrypt/live/plasmatech.dev/fullchain.pem ./fullchain.pem
# sudo chmod +r privkey.pem
# sudo chmod +r fullchain.pem
sudo kubectl create secret tls ssl-cert-secret \
    --cert /etc/letsencrypt/live/plasmatech.dev/fullchain.pem \
    --key /etc/letsencrypt/live/plasmatech.dev/privkey.pem
```

## K8 Load Balancer

We can create our load balancer, including additional parameters for the secret for the
certificate.

See [scripts/plasmatech_service.yaml](scripts/plasmatech_service.yaml)

Once we deploy our load balancer, it will be given a public IP address.

Every time we delete/create the load balancer, we need to update the A record in the DNS
(and wait usually >30 minutes for the DNS to propagate).
