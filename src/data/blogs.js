// src/data/blogs.js
export const DEMO_BLOGS = [
  {
    id: 1,
    title: "Dockerizing Your First App — A Quick Guide",
    category: "DevOps",
    date: "2024-08-10",
    excerpt:
      "Step-by-step guide to containerize a Node.js app using Docker and best practices for images.",
    content:
      "Full walkthrough: Dockerfile creation, multi-stage builds, optimizing layers, and pushing images to Docker Hub. \n\n## Quick Steps\n1. Create Dockerfile\n2. Build image\n3. Run container\n\n## Best Practices\n- Use .dockerignore\n- Prefer multi-stage builds\n- Keep layers minimal\n\nHappy containerizing!",
    author: { name: "Aditya Belsare", avatar: "" },
    tags: ["docker", "containers", "devops"],
  },
  {
    id: 2,
    title: "Kubernetes 101: Deploy an App in 10 Minutes",
    category: "DevOps",
    date: "2024-07-02",
    excerpt:
      "Learn how to create deployments, services, and use kubectl to manage pods for a simple web app.",
    content:
      "Detailed examples of Deployment YAML, Service types, rolling updates, and basic debugging commands.\n\n### Commands\n`kubectl apply -f deployment.yaml`\n`kubectl get pods`",
    author: { name: "Aditya Belsare", avatar: "" },
    tags: ["kubernetes", "k8s", "devops"],
  },
  {
    id: 3,
    title: "CI/CD with GitHub Actions for Infrastructure",
    category: "DevOps",
    date: "2024-06-18",
    excerpt:
      "Automate Terraform runs and linting with GitHub Actions — accelerate infrastructure delivery safely.",
    content:
      "Example workflows, secrets handling, and tips for dry runs and plan reviews before apply.",
    author: { name: "Aditya Belsare", avatar: "" },
    tags: ["ci/cd", "github-actions", "terraform"],
  },
  {
    id: 4,
    title: "Monitoring Basics: Prometheus + Grafana",
    category: "DevOps",
    date: "2024-05-12",
    excerpt:
      "Set up Prometheus scraping and build Grafana dashboards to visualize key metrics for your services.",
    content:
      "Includes sample Prometheus config and a Grafana dashboard JSON to get started quickly.",
    author: { name: "Aditya Belsare", avatar: "" },
    tags: ["monitoring", "prometheus", "grafana"],
  },
];
