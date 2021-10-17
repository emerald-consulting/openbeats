{{ define "labels" -}}
app: {{.Values.meta.name}}
namespace: {{.Values.meta.namespace}}
environment: {{.Values.meta.environment}}
chart: {{.Chart.Name}}-{{.Chart.Version}}
{{- end }}

{{ define "elb-annotations" -}}
service.beta.kubernetes.io/aws-load-balancer-ssl-cert: {{.Values.loadBalancer.cert}}
service.beta.kubernetes.io/aws-load-balancer-ssl-ports: "443"
service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "http"
dns.alpha.kubernetes.io/external: useast1.dev.openbeats716.com
{{- end }}
