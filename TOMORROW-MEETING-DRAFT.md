# Ctrl+S · 明天开会的讨论草稿

这是今晚的准备材料，方便全队一起讨论。用户方向、功能、分工和画面都还可以改，没有定稿，也没有做成正式产品。

## 先用一句话理解题目

Build an AI app that helps people understand how AI may change their jobs, find suitable future careers, and plan which skills to learn next.

就是：帮人看懂AI对工作的影响，选择下一步职业方向，再知道应该学什么。

## 明天一起比较的两个用户方向

| 候选用户 | 他想解决什么问题 | 我们可以展示什么 | 还需要查什么 |
|---|---|---|---|
| 快毕业的学生 | 我会这些东西，第一份工作可以往哪里走？ | 输入技能→比较职业方向→找出缺的技能和第一步课程 | 这是不是学生真的会遇到的困难？现有工具哪里帮不到？ |
| 已在做行政／运营工作的人 | AI能做掉部分日常任务，我下一步该怎样准备？ | 已有技能怎样转用→不同AI发展情况下的选择→适合学习时间的计划 | 找不找得到足够的职业、技能和AI变化资料来支持建议？ |

这些只是候选方向。人物可以虚构，但课程、引用和市场资料要真实。Synthetic profile = 虚构的测试人物，不用任何队员或真人的CV。

## 今晚可以做的准备（约60–90分钟，按精力调整）

- [ ] 阅读这张一页说明，确认自己能用日常语言解释题目。
- [ ] 为两个候选方向，各写一个“用户现在为什么会需要帮助”的例子。
- [ ] 找到一个可能持续更新的AI趋势来源、一个就业／技能资料来源；记下链接、日期、地区和能否重复取得。找到链接不等于已经证明能接入。
- [ ] 列出三个技术问题：资料能否更新？职业推荐怎样说明理由？外部服务失败怎么办？
- [ ] 如有时间，让设计AI根据下面的brief画简单wireframe，最多两种流程草稿。
- [ ] 把找到的资料和草稿带到明天讨论；记录哪些只是自己的假设。

## 界面草稿先画这三个画面

1. **About you**：选择虚构示例人物，或填写技能、兴趣、每周能学习多久。
2. **Explore your options**：比较几个职业方向；每个方向说明已有技能、还缺的技能、支持资料和日期。可展开看更多解释。让用户比较“AI changes steadily”和“AI changes faster”两种假设。
3. **Your next steps**：选择方向后，看到有先后顺序的学习计划、课程位置和时间估计，以及与教育／就业等SDG目标的具体联系。

先检查“人能不能看懂下一步做什么”。颜色、logo、动画等后面再定。所有演示内容注明sample，不把虚构分数或趋势写成已验证结果。

## 可交给设计AI的英文brief

Create two alternative low-fidelity wireframe flows for a hackathon team discussion. These are exploratory drafts, not an approved product design or a working application.

The challenge is an AI career-transition app: help people understand how AI may change their work, compare suitable future career directions, and plan which skills to learn next.

Explore two audiences separately: (A) a student approaching graduation, and (B) an administrative or operations worker considering a career transition. Use the same three-screen structure so the team can compare the approaches fairly.

Screen 1 — About you: a clearly labelled fictional sample profile, editable skills, interests, and available learning hours per week. A form is sufficient; no real CV upload is needed.

Screen 2 — Explore your options: a compact view of changing skills and career directions, source/date locations, suitable roles, an explainable suitability score, existing skills and missing skills. Include two clearly labelled hypothetical scenarios: “AI changes steadily” and “AI changes faster.” A score is not a probability of getting hired. Use progressive disclosure so users do not face every chart and explanation at once.

Screen 3 — Your next steps: an ordered learning plan with time estimates and places for verified learning-resource links. Explain meaningful SDG connections for each role and skill in plain language. Allow users to return and compare another career direction.

Use simple black-and-white wireframes, readable English labels and clear buttons. Annotate the transitions and explain one key trade-off for each audience. Label all illustrative content as sample data; do not invent real courses, market statistics, verified forecasts or evidence. Show placeholders for sources instead of fabricated citations. Do not add login, payments, employer hiring decisions, chat-first interaction or unrelated features. Focus on a short, understandable user journey.

## 明天建议的分工，现场由每个人认领和调整

| 成员 | 候选主责 | 第一份能交出来的东西 |
|---|---|---|
| David | 带方向、UI、整合 | 两个用户方向＋流程草稿＋技术疑问 |
| Sodik | 一起决定技术方案；负责一段技术验证 | 查明source能否接入／matching怎样实现，按熟悉技术选一块 |
| Rania | proposal和slides的组织、表达 | 一页problem→solution故事，整理大家贡献 |
| Anes（语音也称Anis） | 用户问题、SDG和论点依据、pitch | 哪个SDG target相关、为什么相关、资料出处 |
| Sushi | 按步骤做资料核对、测试、证明整理 | 可核对的链接表／测试清单／教程新增规则笔记 |

这些是依据目前对大家强项的了解提出的建议，不代表其他人只能做这些。Sushi也可以选择最想尝试的任务；给清楚步骤、完成例子和交付时间，帮助他独立负责。

## 明天45分钟会议

| 时间 | 一起决定什么 |
|---|---|
| 0–5min | 每个人用自己的话说说题目，先对齐理解 |
| 5–15min | 比较两个用户方向，补充大家自己的想法 |
| 15–25min | 选一个用户和一个最重要的问题，修改wireframe流程 |
| 25–35min | 每人认领一块，确认时间和第一份交付物 |
| 35–45min | 定下次展示时间；核对deadline、赞助API、RunPod、workshops等官方待确认项 |

开场可以说：“我先整理了一些资料和两张方向草稿，让我们比较容易讨论。还没有定案，今天我们一起选。”
