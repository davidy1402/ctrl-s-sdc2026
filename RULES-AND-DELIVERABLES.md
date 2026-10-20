# Ctrl+S · SDC 2026 规则与提交物

核对：2026-10-19 MYT。已确认=官方 PDF 文字或网站现场可见；建议=我们的执行策略；待确认=官方来源冲突或缺失。完整材料及未读视频在 [sources/INDEX.md](sources/INDEX.md)。本文不代表所有媒体已核验完毕。

## 1. 最优先处理的冲突

| 项目 | 来源 A | 来源 B | 当前执行方式 |
|---|---|---|---|
| 初赛 deadline | Participant §6.3.1：25 Oct 07:59:59 AM MYT | 实时 /submit、官网：25 Oct 11:59 PM MYT | 24 Oct 22:00 内部提交目标；向官方索取书面确认，不能自行视为延期 |
| RunPod 是否必用 | Participant §9.3：凡需 GPU 的训练/微调/推理必须 RunPod | ZIP README “How We Use RunPod (Required)”与 checklist 要求已使用 | 将可验证的 RunPod 集成作为准备项；确认无 GPU 项目是否可免、托管 LLM API 的处理方式 |
| API Premium sponsor | /submit：两轮必须集成其技术，否则 DQ | 文件夹未提供明确同名供应商/API 接入说明 | 索取 sponsor 名称、endpoint/docs、credit、合规用法；不能假定 Replit 或 RunPod 就满足 |
| 仓库创建时间 | Participant §6.1.2：hacking 前准备 repo | T&C §5.5.2–3：比赛正式开始后才能建 repo，旧 repo 需书面批准 | T&C 优先；后续正式 GitHub repo 在开赛后新建并保留真实历史；当前本地空 repo 的沿用先核对 |
| 仓库可见性 | Participant 前段：开发时 private，加 judges collaborator | Participant §10.3 与 /submit：提交必须 public | 开发可 private；提交前公开并确认无 secrets，保持可访问。不要只加 collaborator 就视为满足 |
| 提交渠道 | handbook 列 6 个 deliverables | /submit 仅接收 GitHub URL | 用 README 链接所有材料，文件置 submission/；核对教程有无确切路径要求 |
| Final pitching 时间/地点 | Participant §6.7.1：1 Nov 18:00–20:30，§6.7 A3#517/516 | rundown：09:40–12:40、13:40–15:40，venue 表另写 A4#113/A5#119 | 等最终安排；不据此订离场时间 |
| workshop 必修 | Proposal checklist：全体完成 GenAI/Database/Cloud Deployment | Workshop Recordings 目录当前为空 | 每人记录实际完成情况，确认课程时间、录播与补课认定；未完成不勾选 |
| RunPod credit | Participant：每队 US$25 | portal：每人独立 voucher，目前均待发 | 不预支到账承诺；领取后按实际额度更新预算与声明 |

可复制给官方的询问稿（仅草稿，未发送）：

> Hi committee, we are Ctrl+S, Domain 1. Could you confirm in writing: (1) Is the Phase 1 deadline 25 Oct 07:59:59 AM or 11:59 PM MYT? (2) Which API Premium sponsor technology is mandatory, and where are its access/docs? (3) Is RunPod mandatory even without a GPU workload, and how does the rule apply to hosted LLM APIs? (4) Should all six deliverables be included/linked in the public GitHub repository, since /submit only takes that URL? (5) Where are the mandatory workshops/recordings and how is completion verified? Thank you.

## 2. Domain 1 必须交付的产品能力

依据 [Domain 1](https://drive.google.com/file/d/1x6Nvjl_1Gc-v3SsTnf44HVEJZQsbWVRA/view)，§3–8。

| 必需能力 | 官方要求 | 可验收证据 |
|---|---|---|
| Skills intake | CV、表单或问卷记录当前技能与潜力 | synthetic persona 输入后形成可编辑 skills profile；无需做 CV 上传 |
| AI-trend signals | 至少一个可更新 AI/就业趋势来源；显示来源和日期；纯 hardcode 不算 | 真实可更新来源＋获取时间＋原始链接；数据不足显示不足 |
| Future-role matching | 职业排序、可解释分数、明确 skills gap | 同一个人可看到 top roles、分数分项、已具备与缺失技能 |
| Reskilling pathway | 有顺序、时间估计、免费/低价资源 | 每步技能、前置条件、学习时长、真实课程链接与费用状态 |
| SDG mapping | 每个角色及技能至少对应一个 SDG，并解释贡献 | 每条 role/skill 都有对应和理由；无需强行贴满 17 个 SDG |
| Uncertainty | 至少两种未来情景，明确预测为估计 | moderate/fast 情景对比；假设和证据可见；分数不是就业概率 |

最终必须六项齐全。初赛 proposal 要解释六项如何完成，demo 至少展示最重要功能真正运行，通常是 signals → matching；初赛不要求完成全部产品。成功标准是：几分钟完成 profile → roles → pathway；推荐可追溯；趋势变化时输出可见变化；SDG 有实际关联。

可选：HR heatmap、自动重排、多语言/低带宽/移动端、进度/badges、公平性检查、个人/公司/地区 SDG 聚合。无独立加分项，只能强化创新和契合；优先级低于核心链路。

## 3. 评审、晋级与奖金

初赛 rubric：

| 标准 | 权重 | 我们必须拿出的证据 |
|---|---:|---|
| Innovation & Creativity | 30% | 一个具体用户和决策时刻；趋势信号、情景或 SDG 如何影响选择，超越 CV chatbot |
| Problem–Solution Fit | 25% | 跟踪 AI→预测角色/技能→匹配→学习路径→SDG 的完整逻辑；六项都有交付计划，保留人类决策 |
| Feasibility of Build | 25% | 可操作核心 demo，与 GitHub 一致；最难风险＋可用 fallback；只用 public/synthetic data |
| Clarity of Proposal | 20% | 问题→方法→结果清楚；用户及收益可复述；格式与字数合规 |

分项得分=权重×评分档位百分比。文件没有完整档位描述，不能自行编造。每赛道最多 15 支 finalist；不足合格队可少于 15。初赛分数不带到决赛，决赛用另发 rubric；不能把初赛权重当最终奖金评分。

官网 [Prizes](https://sdchack.my/#prizes) 当前每赛道：

| 排名 | 每队奖金 |
|---|---:|
| Champion | RM3,000 |
| 1st runner-up（第2） | RM1,500 |
| 2nd runner-up（第3） | RM1,000 |
| 3rd runner-up（第4） | RM750 |
| 4th runner-up（第5） | RM250 |
| 其余10队 finalist | 每队 RM150 |

合计每赛道 RM8,000，两赛道 RM16,000。官网同时注明金额为待赞助确认的目标，Official Handbook 写 up to RM16,000，实际以最终官方公告及资格核验为准。奖金给队伍，不是每位成员；内部如何分配由队员自行约定，主办方不调解。获奖可能需身份证明、学生资格、收款资料；违规/虚假信息/核验失败可撤奖。证书包含参赛/决赛/获奖 e-certificates。

Participant §6.8.3 决赛同分顺序：Technical Execution → Problem–Solution Fit → Impact & Feasibility → Innovation & Creativity → Presentation & Pitch → Design & UX，再由评委讨论。此顺序不是公开的决赛权重。

## 4. 初赛六项提交物

| 提交物 | 格式与要求 | 负责人建议 |
|---|---|---|
| Proposal/PRD | 使用官方 Preliminary Project Proposal 模板；单一 PDF，SDC2026_Ctrl+S_Preliminary.pdf；字数/声明完整 | PRD owner；你审核技术部分 |
| Pitch deck | 问题、方案、技术、影响；与 video 一致，README 可访问；初赛文件格式未明确，准备 PPTX＋PDF | Pitch owner |
| Functional prototype | 可访问 deployed link/build；评委能操作或直接观察，不能只有静态 mockup/影片 | 你；QA 验收 |
| Technical & Tools Declaration | 单一 PDF，SDC2026_Ctrl+S_TechDeclaration.pdf；每栏填写，不适用写 None/No | QA/运营记录；你核对 |
| GitHub/source | public，Apache 2.0 LICENSE，真实连续 history；源码、运行步骤、所有 links/docs | 你；QA 无登录核对 |
| Pitch/demo video | YouTube link，5–7分钟；超时每30秒扣1分（依最终规则）；包含真实 prototype demo | Pitch/video owner |

建议统一 ASCII 文件名时可用 CtrlS，但官方模板写 TeamName；是否必须保留 Ctrl+S 原名先确认。文件本身与 README 保持注册队名准确。

提交页当前只收 GitHub URL，且检查 public。建议结构（建议，不声称为额外官方强制文件名）：

```text
README.md                   # 所有交付链接、问题/方案、运行/部署、架构、limitations、团队
LICENSE                     # Apache 2.0
src/                        # 实际项目代码；技术栈自由
docs/                       # 架构、来源、测试结果
submission/
  SDC2026_CtrlS_Preliminary.pdf
  SDC2026_CtrlS_TechDeclaration.pdf
  pitch-deck.pptx
  pitch-deck.pdf
  REPLIT PROOF OF USE.pdf
  RUNPOD PROOF OF USE.pdf    # 使用时；必用争议见上
```

官方 ZIP 为 Python/RunPod 示例，不强制选择 Python。README 要填写团队/domain/SDG、Replit/live demo、RunPod、slides/video、problem/solution/features/stack/architecture、运行与测试步骤、两项平台使用说明与 proof、挑战/学习、未来改进、团队分工及 checklist。ZIP 内两个 proof PDFs 仅写 EXAMPLE ONLY，不能直接拿来当使用证明。ZIP 带了模板自身 .git 历史，正式项目不能把它冒充本队开发历史。

## 5. 两份官方模板的所有字段

Proposal：

- Team overview：队名、domain、SDG track 1–17、项目名、leader、leader email/phone、学校、人数。
- §2.1 Problem Context ≤250词；§2.2 Proposed AI Solution ≤300词。
- §3.1 Conceptual Tech Stack：技术/API/数据库、架构示意、赞助资源及用途；未列字数上限。
- §3.2 Design-Thinking & Deployment Strategy ≤200词。
- §4 Impact：exact SDG sub-target、数字 baseline、可衡量 KPI、百分比 Phase 2 target；允许有依据的估计/研究/benchmark，必须引用，不能编造已验证效果。
- §5 Readiness：全体完成必修三类 workshops、真实问题与 SDG、功能部署目标、所有字段/字数完成；只勾选真实完成项。
- §6 IP：pre-existing/prior-owned work 与成员归属；第三方 code/dataset/model/license；employment/internship/consulting IP conflict。事实未知不能代答 No。
- §7 leader declaration、签名、日期，提交前由队长确认。

Technical Declaration：

- §1 团队与项目、leader 联系方式、学校、live URL、repo URL。
- §2.1 architecture ≤200词；§2.2 language/framework/library 的 name/version/purpose/license。
- §3.1 每个 external API/provider/purpose/access tier；§3.2 hosting/storage/db/auth/compute provider/purpose/plan/region。
- §4.1 每个 AI model/version/provider/license/usage（pretrained/fine-tuned/self-trained）；§4.2 dataset/source/type/license/personal-data Y/N；§4.3 code/design/text/doc AI development tools/version/use/extent（minor/moderate/major），包括本次使用的 Codex/ChatGPT；团队 review/test/责任说明 ≤100词。
- §5 sponsor resource/provider/use；是否核心或可替换说明 ≤100词。
- §6.1 collected/stored/transmitted data、protection/retention ≤150词；§6.2 hallucination/bias/rate limits/provider dependence 与 mitigation ≤150词。
- §7 checklist：完整声明、合法许可/归属、无 secrets、AI review、sponsor declaration、可访问 prototype、字段/字数合规。
- §8 leader declaration、签名、日期。任何不适用项写 None/No，不留白；不写 API keys。

Replit proof：本队 project/account 的 live deployment URL、project/history link 或 credits finished 证明（三者之一，handbook 原文如此）；建议用 project＋live link＋截图。RunPod proof：本队 dashboard，Pod ID/GPU type/runtime；Serverless 用 endpoint 替 Pod ID。公开材料须遮掉密钥、账户私有资料与带访问令牌的 URL；普通 endpoint 标识不含 secret 时才可公开。

## 6. Domain 1 数据与 AI 边界

- 只用 public/open/synthetic data；不使用真实个人数据或真实 CV，demo 用 synthetic profiles。模板允许一般数据类型，并不放宽 Domain 1 的限制。
- 每个推荐引用来源；不编造工作、课程或统计；模型名称/version 清楚声明。缺证据就显示 insufficient evidence。
- 作为职业决策支持；用户保留选择权，不做最终招聘/淘汰决定。
- 不做完整课程内容、支付、真实招聘系统接入。
- 至少一个可更新来源，hardcode-only 不合格。研究新闻不能直接当成统计就业预测；样本变化/情景假设要解释。
- 免费/付费 API 都可，但成本归队伍；需要 GPU 的工作按 handbook 使用 RunPod。API Premium sponsor 额外要求必须确认。

## 7. 其他比赛规则总表

- T&C 为政策优先来源；Participant 对运营细节优先于 Official Handbook；主办方可通过指定官方渠道更新规则，争议解释归主办方。冲突需书面明确，不能把个人口头建议当修订。
- 仅马来西亚认可高校在读 foundation/diploma/bachelor 学生，比赛全程在籍；每人一队，1–5人，注册后不能换人；若有未满18岁成员，实体活动需监护人书面同意。
- 你们 Ctrl+S 已注册5人。全体必须加入 Discord 并看公告；leader 负责传达。portal 当前一个成员未连接需本人核对。WhatsApp 是辅助通告渠道。
- 核心想法、问题理解、方案与重大技术决定来自团队；比赛期内完成主要实现。不得交以往比赛/商用/已发布的完整项目；合理基础模块可按规则声明，既有材料审批表述有差异，使用前先确认。
- AI 辅助允许且鼓励，必须声明并 review/modify/test，任何队员可能被要求解释；不能把整套生成输出未经理解直接提交。声明 AI 本身不减分（工具模板）；隐藏使用可能影响分数/资格。
- significant contribution 仅限注册成员；不外包，不让非成员代写代码/设计/文档/presentation。Mentor 可反馈思路、debug策略、UX、pitch、impact，不可代做项目或代决策。
- 保留真实持续 Git history，不伪造时间、不一次性把预制成品上传冒充开发；late bulk commit 可触发审查。
- 截止后 repo 与提交材料 freeze：无未经允许的 commits、bugfix 或改文件；即使网站可重复提交也只限截止前。升级阶段再按官方指示恢复。
- T&C 明确不接受 late submission；只有官方平台故障且主办认可才可能有例外。第三方 outage 不自动延期，只按官方 Discord 通知的替代方案/延期执行。
- 禁止抄袭、虚假数据/能力/资格、license/IP 侵犯、泄密、违法/有害项目、骚扰歧视、干扰别人、破坏设施。罚则从 warning/扣分到 DQ/撤奖，核验可发生于赛后。
- 团队保留自创 IP；第三方组件归原权利人；organiser 获评审/核验/存档/展示的非独占许可，不因此取得商用权；sponsor 不自动取得 ownership，商业合作另议。队内共同 IP 和奖金分配自行约定。
- Organiser 可拍摄并作活动宣传/教育/报告等用途；有具体保密/影像顾虑提前书面沟通。Sponsor partner recognition 和 ORION enrolment 可向 xmumai@gmail.com opt out，不影响评审/晋级/奖金。报名信息分享给 sponsor 的政策见 T&C §19；不把队伍真实资料当 demo data。
- 注册费 RM40 early/RM50 normal不退；RM25 deposit 按有效初赛（功能原型/完整repo/文档）及参加要求核验后退，未交/不完整/无故缺席可能不退；具体到账时间另发。

## 8. 后续阶段与现场准备

| 事件 | 当前公布时间 MYT |
|---|---|
| 初赛 | 19 Oct 20:00 起；deadline 冲突见顶部 |
| 审查/shortlist | 25–28 Oct |
| finalist 通知 | 28 Oct 20:00 |
| 本队确认/表单/visitor pass | 29 Oct 12:00 前 |
| replacement 确认 | 29 Oct 20:00 前；条款同时写 five hours，与时间跨度不符，不用于本队计划 |
| upgrade | 28–30 Oct，仅 finalists |
| physical | 31 Oct；08:00–09:30 registration，09:30 briefing/start |
| 最终提交 | 1 Nov 07:59:59 AM |
| final pitch | 10min＋5min Q&A；时间/房间待最终排期 |

Final deliverables（Participant §6.6.4）：updated PRD（标明变化原因）、updated tools declaration、final solution report（features/architecture/SDG/evolution）、backup YouTube pitch video、GitHub/source、final PPTX slides、可运行 prototype/demo材料和必要 demo accounts。Demo 账号仅 synthetic，任何测试访问设计不能含真实 secrets。

准备自己 laptop、charger、HDMI/USB-C adapter、extension、多余备份、sleeping bag/blanket、jacket、clothes、toiletries/towel、学生证、离线 deck/video。大型模型/数据提前下载，现场禁止 heavy scraping/multi-GB downloads。Wi-Fi、休息区/淋浴可提供，交通自理，个人物品自保。badge不借人，遵守campus/安全/禁烟禁酒/出入/睡眠区规则；紧急事件向委员会报告。Help desk 在 A3 5楼，具体点位待通知。

车辆按规定提前48h登记，南/东门依安保入校，A3附近 basement parking；replacement vehicle exception 按官方说明执行。餐饮、可及性与过敏需求提前告知。

具体 venue 表：briefing A4#G07、rest/mentoring A3#512/505、ceremony A1 Tan Hua Choon Auditorium、eating A3 ground floor、hacking A3#506/508/509/511/517/518；pitch房间存在上述冲突。

## 9. 提交当天逐项放行

- [ ] public repo 无登录可打开；LICENSE、README、源码及运行步骤一致。
- [ ] 六项 deliverables 都有实际文件/有效链接，proposal/tech declaration 字数和签名真实完成。
- [ ] live demo 在新浏览器/手机可运行，不依赖你的 local session。
- [ ] synthetic profiles；每条 role/course/stat 有来源；trend source可更新、日期可见；至少两情景。
- [ ] Replit/RunPod/sponsor API 证据按已确认规则齐全；checkbox只确认真实集成。
- [ ] YouTube 在无登录下可播放、5–7分钟、含 prototype；非仅上传成功还要等处理完成。
- [ ] deck/video/repo/proposal 使用相同产品名称、功能与版本。
- [ ] secrets、支付/真实CV/成员联系方式等没有误放公共repo；声明仅按正式要求收集必要信息。
- [ ] 通过 /submit 提交并确认成功状态，保存回执与 final commit；本轮未代提交。
- [ ] 提交后截止时冻结代码、数据与deploy，直到官方允许升级。
