// Skills Section Logo's
import htmlLogo from './assets/tech_logo/html.png';
import cssLogo from './assets/tech_logo/css.png';
import sassLogo from './assets/tech_logo/sass.png';
import javascriptLogo from './assets/tech_logo/javascript.png';
import reactjsLogo from './assets/tech_logo/reactjs.png';
import angularLogo from './assets/tech_logo/angular.png';
import reduxLogo from './assets/tech_logo/redux.png';
import nextjsLogo from './assets/tech_logo/nextjs.png';
import tailwindcssLogo from './assets/tech_logo/tailwindcss.png';
import gsapLogo from './assets/tech_logo/gsap.png';
import materialuiLogo from './assets/tech_logo/materialui.png';
import bootstrapLogo from './assets/tech_logo/bootstrap.png';
import springbootLogo from './assets/tech_logo/springboot.png';
import nodejsLogo from './assets/tech_logo/nodejs.png';
import expressjsLogo from './assets/tech_logo/express.png';
import mysqlLogo from './assets/tech_logo/mysql.png';
import mongodbLogo from './assets/tech_logo/mongodb.png';
import firebaseLogo from './assets/tech_logo/firebase.png';
import cLogo from './assets/tech_logo/c.png';
import cppLogo from './assets/tech_logo/cpp.png';
import javaLogo from './assets/tech_logo/java.png';
import pythonLogo from './assets/tech_logo/python.png';
import typescriptLogo from './assets/tech_logo/typescript.png';
import gitLogo from './assets/tech_logo/git.png';
import githubLogo from './assets/tech_logo/github.png';
import vscodeLogo from './assets/tech_logo/vscode.png';
import postmanLogo from './assets/tech_logo/postman.png';
import mcLogo from './assets/tech_logo/mc.png';
import figmaLogo from './assets/tech_logo/figma.png';
import netlifyLogo from './assets/tech_logo/netlify.png';
import vercelLogo from './assets/tech_logo/vercel.png';
import postgreLogo from './assets/tech_logo/postgre.png';
import csharpLogo from './assets/tech_logo/csharp.png';

// Experience Section Logo's
import webverseLogo from './assets/company_logo/webverse_logo.png';
import agcLogo from './assets/company_logo/agc_logo.png';
import newtonschoolLogo from './assets/company_logo/newtonschool_logo.png';

// Education Section Logo's
import glaLogo from './assets/education_logo/gla_logo.png';
import bsaLogo from './assets/education_logo/bsa_logo.png';
import vpsLogo from './assets/education_logo/vps_logo.png';

// Project Section Logo's
import githubdetLogo from './assets/work_logo/github_det.png';
import csprepLogo from './assets/work_logo/cs_prep.png';
import movierecLogo from './assets/work_logo/movie_rec.png';
import taskremLogo from './assets/work_logo/task_rem.png';
import npmLogo from './assets/work_logo/npm.png';
import webverLogo from './assets/work_logo/web_dig.png';
import cmLogo from './assets/work_logo/cm.png';
import imagesearchLogo from './assets/work_logo/image_search.png';
import removebgLogo from './assets/work_logo/remove_bg.png';


export const SkillsInfo = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', logo: htmlLogo },
      { name: 'CSS', logo: cssLogo },
      { name: 'SASS', logo: sassLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'React JS', logo: reactjsLogo },
      { name: 'Angular', logo: angularLogo },
      { name: 'Redux', logo: reduxLogo },
      { name: 'Next JS', logo: nextjsLogo },
      { name: 'Tailwind CSS', logo: tailwindcssLogo },
      { name: 'GSAP', logo: gsapLogo },
      { name: 'Material UI', logo: materialuiLogo },
      { name: 'Bootstrap', logo: bootstrapLogo },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Springboot', logo: springbootLogo },
      { name: 'Node JS', logo: nodejsLogo },
      { name: 'Express JS', logo: expressjsLogo },
      { name: 'MySQL', logo: mysqlLogo },
      { name: 'MongoDB', logo: mongodbLogo },
      { name: 'Firebase', logo: firebaseLogo },
      { name: 'PostgreSQL', logo: postgreLogo },
    ],
  },
  {
    title: 'Languages',
    skills: [
      { name: 'C', logo: cLogo },
      { name: 'C++', logo: cppLogo },
      { name: 'Java', logo: javaLogo },
      { name: 'Python', logo: pythonLogo },
      { name: 'C-Sharp', logo: csharpLogo },
      { name: 'JavaScript', logo: javascriptLogo },
      { name: 'TypeScript', logo: typescriptLogo },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', logo: gitLogo },
      { name: 'Jenkins', logo: githubLogo },
      { name: 'Terraform', logo: vscodeLogo },
      { name: 'Kubernetes', logo: postmanLogo },
      { name: 'Grafana', logo: mcLogo },
      { name: 'Prometheus', logo: vercelLogo },
      { name: 'AWS', logo: netlifyLogo },
      { name: 'Docker', logo: figmaLogo },
      
    ],
  },
];

  export const experiences = [
    {
      id: 0,
      img: webverseLogo,
      role: "DevOps Engineer",
      company: "Infosys Ltd",
      date: "Jan 2022 - Present",
      desc: [
    "Architected and implemented scalable cloud solutions, enhancing enterprise application performance and resilience.",
    "Executed cloud migration strategies, achieving 25% reduction in infrastructure costs through efficient resource allocation",
    "Configured AWS networking components, including VPCs, subnets, and security groups, to ensure secure connectivity.",
    "Conducted comprehensive cloud infrastructure assessments, identifying optimization opportunities and cost-saving initiatives.",
    "Managed automated deployment pipelines using Jenkins and Docker.",
    "Implemented containerization technologies such as Docker and Kubernetes for faster delivery cycles.",
  ],
      skills: [
        "Jenkins",
        "AWS",
        "Terraform",
        "Kubernetes",
        "Docker",
        "Vault",
        "Grafana",
        "Prometheus",
        "InfluxDB",
      ],
    },
    {
      id: 1,
      img: agcLogo,
      role: "SRE Engineer",
      company: "Infosys Ltd",
      date: "Jan 2022 - Present",
      desc: [
    "Engineered cloud-native architectures using AWS EC2, S3, VPC, and ECS for enterprise-scale workloads.",
    "Configured secure infrastructure practices with HashiCorp Vault and AWS Parameter Store for credential management",
    "Orchestrated Kubernetes clusters and containerized workloads with Docker and Helm charts for consistent deployments.",
    "Developed a scalable SRE framework with Terraform and AWS, reducing downtime by over 40%.",
    "Monitored performance metrics utilizing Prometheus, Grafana, and Alertmanager, accelerating incident remediation by 50%.",
    "Implemented blue-green and canary release strategies to enhance reliability during rollouts",
    "Automated CI/CD pipelines integrating application delivery and Infrastructure as Code for efficient provisioning.",
    "Facilitated knowledge sharing sessions to promote team collaboration and continuous learning.",
  ],
      skills: [
        "Jenkins",
        "AWS",
        "Terraform",
        "Kubernetes",
        "Docker",
        "Vault",
        "Grafana",
        "Prometheus",
        "InfluxDB",
      ],
    },
  ];
  
  export const education = [
    {
      id: 0,
      img: glaLogo,
      school: "Tejswini Vidya Mandir",
      date: "2015",
      grade: "85 % ",
      desc: "Completed SSC from Maharstra State Board",
      degree: "SSC",
    },
    {
      id: 1,
      img: bsaLogo,
      school: "Government Polytechnic",
      date: "Sept 2018 - Aug 2021",
      grade: "80.25 %",
      desc: "Completed Diploma from RTMNU",
      degree: "Diploma ",
    },
    {
      id: 2,
      img: vpsLogo,
      school: "G.H Raisoni College of Engineering",
      date: "Apr 2018 - March 2021",
      grade: "76%",
      desc: "I completed my Bachelors from RTMNU",
      degree: "BE",
    },
   
  ];
  
  export const projects = [
    {
      id: 0,
      title: "EKS through Terraform",
      description:
        "A powerful and user-friendly React.js application designed to uncover and showcase detailed GitHub profile information. Simply enter a GitHub username, and the app fetches comprehensive data, including profile stats, repositories, followers, and contributions. The intuitive interface ensures a seamless experience, making it a must-visit tool for developers and recruiters.",
      image: githubdetLogo,
      tags: ["Jenkins", "Kubernetes", "Docker", "Grafana", "AWS", "CICD", "Prometheus"],
      github: "https://github.com/belsareaditya/Vg_Animation_Admin_Console",
      webapp: "https://vaultguardaditya.netlify.app/",
    },
    {
      id: 1,
      title: "Vault Guard App",
      description:
        "Vault Guard App is a secure vault application built to demonstrate strong DevOps practices. The infrastructure was provisioned using Terraform (IaC) and deployed on Amazon EKS (Kubernetes) with containerized workloads using Docker. A full CI/CD pipeline with Jenkins automates build, test, and deployment workflows.",
      image: csprepLogo,
      tags: ["Jenkins", "Kubernetes", "Docker", "Grafana", "AWS", "CICD", "Prometheus"],
      github: "https://github.com/belsareaditya/Vg_Animation_Admin_Console",
      webapp: "https://vaultguardaditya.netlify.app/",
    },
    
  ];  