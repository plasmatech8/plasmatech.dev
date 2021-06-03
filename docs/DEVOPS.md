# Devops Infrastructure

> TODO: Remove YAML and put them into a scripts/ file

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

Then we can add the domain in the Linode Domains dashboard and add records.

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

## K8 Pods Deployment

Deployment (for webservers)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: networkchuckcoffee-deployment
  labels:
    app: nccoffee
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nccoffee
  template:
    metadata:
      labels:
        app: nccoffee
    spec:
      containers:
      - name: nccoffee
        image: thenetworkchuck/nccoffee:pourover
        imagePullPolicy: Always
        ports:
        - containerPort: 80

```

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

We can create our load balancer, including additional parameters for the secret for the certificate:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: coffee-service
  annotations:
    service.beta.kubernetes.io/linode-loadbalancer-throttle: "4"
    service.beta.kubernetes.io/linode-loadbalancer-default-protocol: http
    service.beta.kubernetes.io/linode-loadbalancer-port-443: '{ "tls-secret-name": "ssl-cert-secret", "protocol": "https" }'
  labels:
    app: coffee-service
spec:
  type: LoadBalancer
  ports:
  - name: https
    port: 443
    protocol: TCP
    targetPort: 80
  selector:
    app: nccoffee
  sessionAffinity: None

```

Once we deploy our load balancer, it will be given a public IP address.

Every time we delete/create the load balancer, we need to update the A record in the DNS
(and wait usually >30 minutes for the DNS to propagate).