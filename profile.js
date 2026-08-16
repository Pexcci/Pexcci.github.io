/*
 * 个人资料配置
 * GitHub 账号链接与公开仓库展示由 githubUsername 控制。
 */
window.PROFILE = {
  name: "张志强",
  shortName: "Zhiqiang Zhang",
  initials: "ZZQ",
  role: "信息与计算科学本科生",
  heroLine: "在数学与计算之间探索。",
  bio: "西北工业大学信息与计算科学专业本科生，关注数值计算、有限元仿真与人工智能，希望用数学工具理解问题，也用计算方法解决问题。",
  status: "期待科研交流与合作",
  location: "西安 · 西北工业大学",
  focus: "数值计算 / 有限元 / AI",
  about1: "我就读于西北工业大学数学与统计学院信息与计算科学专业，GPA 4.024/4.1，学业成绩与综合测评均位列年级 1/148。",
  about2: "目前，我在复杂系统动力学与控制工信部重点实验室参与空间大型天线动力学建模研究，负责基于 Neo-Hookean 超弹性本构模型的数学建模与 ANSYS 有限元仿真。我也持续关注奇异值分解、数值分析和人工智能的交叉应用。",
  contactText: "如果你对数值计算、工程仿真、数学建模或人工智能感兴趣，欢迎通过邮件和我交流。",

  githubUsername: "httpkaitou8",
  email: "zhang.zq@mail.nwpu.edu.cn",
  links: {
    blog: "#",
    social: "#"
  },

  featuredProjects: [
    {
      name: "空间大型天线动力学建模",
      description: "面向空间大型天线展开问题，研究不同受力与材料属性下的形变行为。基于 Neo-Hookean 超弹性本构模型构建数学方程，并使用 ANSYS 开展有限元仿真。",
      language: "ANSYS / FEM",
      url: "#",
      homepage: "#",
      topics: ["有限元仿真", "超弹性", "微分方程"],
      meta: "国家级大创 · 2025.5 至今",
      accent: "violet"
    },
    {
      name: "SVD 原理及其应用",
      description: "从几何视角理解奇异值分解，并通过编程演示广义逆计算、PCA 与图像压缩，讨论其在数值计算和图像处理中的应用。",
      language: "Numerical Computing",
      url: "#",
      homepage: "#",
      topics: ["SVD", "PCA", "图像压缩"],
      meta: "课程论文 · 2025.12",
      accent: "cyan"
    },
    {
      name: "HCIA-AI 人工智能认证",
      description: "系统学习机器学习、深度学习和大语言模型基础，以及人工智能前沿应用场景，通过 Huawei Certified ICT Associate-AI V4.0 认证。",
      language: "Artificial Intelligence",
      url: "#",
      homepage: "#",
      topics: ["机器学习", "深度学习", "大语言模型"],
      meta: "华为认证 · 2025.12",
      accent: "lime"
    }
  ],

  stack: [
    { name: "数学分析", mark: "MA", color: "#9eff62" },
    { name: "数值分析", mark: "NA", color: "#54d9ff" },
    { name: "有限元仿真", mark: "FE", color: "#8b7dff" },
    { name: "ANSYS", mark: "An", color: "#ffd15c" },
    { name: "微分方程", mark: "DE", color: "#ff8c69" },
    { name: "SVD / PCA", mark: "Σ", color: "#79e0c3" },
    { name: "机器学习", mark: "ML", color: "#f4a8ff" },
    { name: "数学建模", mark: "M", color: "#7db4ff" }
  ]
};
