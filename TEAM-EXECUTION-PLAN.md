# Ctrl+S · Domain 1 执行方案

2026-10-19。以下是供团队讨论/认领的建议，尚未变成已确认的产品决定；官方要求见 [RULES-AND-DELIVERABLES.md](RULES-AND-DELIVERABLES.md)。当前工作区只有本次整理资料，没有实现或部署产品。

## 1. 这究竟是什么题

它是 AI 时代的职业转型决策系统，技术重点是“可更新的证据如何改变人的下一步行动”。完整链路：

```text
public AI/job signals → 带日期/出处的趋势证据 → role/skill需求估计
                                               ↓
synthetic技能档案 → 可解释职业排序 → skills gap → 有顺序的学习路径
                                               ↓
                                SDG贡献理由＋不同AI变化情景
```

它同时考数据来源、推荐解释、产品聚焦和可行性。界面好看会帮助 demo，但初赛80%权重来自创新、契合与可实现性；核心要证明 signal → ranking 确实跑通。

## 2. 建议比较的三个切入点

| 切入点 | 优点 | 主要风险 | 建议 |
|---|---|---|---|
| 马来西亚早期职场行政/运营人员转型 | 用户和受AI影响的任务容易界定；可展示现有技能迁移 | 不能把推测职业当已存在职业；要验证role/skills证据 | 推荐首先评估 |
| 应届毕业生第一份工作选择 | 团队熟悉，可迅速做任务理解测试 | 很容易做成一般CV/job chatbot | 作为可替代选择；必须有动态证据差异 |
| 企业HR全员再培训 | 商业叙事直接 | 多用户、heatmap、组织数据使单工程师负担过大 | 决赛/roadmap，初赛不做主线 |

推荐候选用户：一名拥有 spreadsheet、报告与协调技能、每周只有少量学习时间的 synthetic junior operations worker，想选择一个可达的下一份角色。演示一个决策：“相同背景与每周学习时数，AI变化更快时，我该先学什么，为什么？”用户类型及具体角色在团队理解证据后确定；不要把此建议直接冒充团队原始调研结论。

创新主张候选：**把“职业是否热门”转成“对我而言哪个转型路径最可达、在不同未来里是否稳健”。** 最有说服力的一幕：同一 synthetic profile，导入新的真实、有日期的信号快照，展示变化及原因；再切换 moderate/fast 情景，比较排序和学习投入。情景假设与实际数据更新是两件事，不能用切换情景冒充抓到新市场数据。

## 3. 初赛 MVP 范围与技术顺序

建议仅做一个用户旅程、3个 synthetic profiles、约5个可验证角色、20–30个技能、10–15个经核对的真实学习资源。这些数量是范围建议，不是规则或完成事实。

1. 先证明一个上游 source 可以实际更新。保留 source URL、published/fetched time、许可/使用条件、原始记录、技能映射、来源类型与地域范围；至少找到可维护的 AI趋势与就业信号，不把一篇研究当作全市场预测。
2. 先用显式规则/权重完成 matching：可迁移技能覆盖、missing skills、学习时间可达性、趋势/情景影响分别解释。分数是排序启发式，不能写成“成功就业概率”。公式与默认权重进入文档，由团队理解并验证。
3. LLM 用于将已知资料映射到受控技能标签、解释路径；只允许引用已存在 source/role/course ID。不存在或引用不合格则拒绝输出/退回确定性说明。模型/费用/赞助商未确认前保持 provider 可替换。
4. UI：sample profile/intake → radar → top roles/score breakdown → ordered pathway/SDG reasons。用合成数据入口和明确日期；优先让完整旅程在一个演示中自然跑通。
5. Replit 真实参与开发或部署并保留证据；RunPod与API Premium规则确认后，优先接一个有实际用途的小型服务。未确认前不要决定“只用外部AI API一定合规”。

建议使用你最熟悉的 web stack、单个应用/后端、轻量数据存储；正式选型在源数据 spike 与 sponsor docs 后确定。初赛不做账号体系、真实CV上传、自动招聘、课程交易、全公司dashboard、从头训练模型。鉴于领域数据限制，表单＋sample personas 足够，不必承担CV解析与个人数据风险。

fallback：来源短暂断线时显示最近成功拉取的真实缓存、明确日期与过期提示；这是可用性fallback，不能只有hardcode。首次source接入完全失败时换一个真实可更新来源；不能用假“实时”按钮交差。Demo记录两个真实source版本；若只有一次快照，明确承认无法证明市场随时间变化，使用标注为synthetic的测试更新只验证软件逻辑。

可用性与视觉实现时，已安装 design-taste-frontend、impeccable 可协助 UI/UX；目前只规划，没有套用未经团队确认的视觉方案。

## 4. 五人职责：让非代码工作形成工程输入

portal确认5名成员；目前只知道你负责full-stack/UI/AI，未核实其他人的具体强项和可用时间，因此下面用角色占位，不擅自按姓名分配。

| 人 | 主责 | 每日交给团队的实物 | 不应压回你身上的工作 |
|---|---|---|---|
| David / tech lead | product scope、UI、backend、matching、AI、deploy | 可运行核心增量＋技术决定＋接口/数据字段 | 你只review事实，不包办剪片/找课/排版 |
| A / problem & PRD | persona、问题证据、SDG targets、proposal主笔 | 1页问题定义、引用表、≤字数proposal草稿 | 主动整理不懂项，集中每天一次技术问答 |
| B / evidence & content | public趋势/岗位/技能、课程/许可核验 | source表、role-skill表、course表、synthetic profiles | 不要求写crawler；把结构化资料交给你导入 |
| C / pitch & video | narrative、slides、讲稿、录音、剪辑、YouTube | 6分钟storyboard→deck→可播放成片 | 你只录技术demo、核对描述准确性 |
| D / QA & operations | acceptance tests、教程核对、规则问题、使用证据、提交检查 | bug表、requirements matrix、平台proof、媒体规则笔记 | 维护提交清单；跟进workshops/mentor/vouchers |

若只有一人擅长剪辑，优先固定给C；A与B可互审。成员姓名由队内认领。建议每天两个短同步：开始时10分钟确认交付，结束时15分钟展示实物；技术问题汇总到固定20分钟窗口。所有人能解释用户、匹配逻辑、来源、局限与AI使用；不要只有你能回答。

数据交付字段建议：

| 表 | 最少字段 |
|---|---|
| sources | id, title, url, publisher, published_at, fetched_at, type, region, license_or_terms, evidence_excerpt |
| role/skill evidence | role_id, canonical_title, skill_id, source_ids, interpretation, uncertainty |
| courses | id, title, provider, official_url, skill_ids, estimated_hours, price_status, checked_at, prerequisites |
| synthetic profiles | id, synthetic=true, skills, experience_description, interests, hours_per_week, constraints |
| SDG links | role_or_skill_id, sdg_number, target_id, reason, evidence_or_rationale |

真实课程价格和是否HRD Corp-claimable要逐条核实；缺证据写unknown，不能凭名字断言。源材料中引用的劳动力数字只是brief背景，不直接当我们的试验baseline。

## 5. 倒排日程（全部 MYT）

暂以更早的25 Oct 07:59:59 AM为外部边界；**24 Oct 22:00为内部完整提交目标**。网站目前显示25 Oct 23:59，但不依赖争议出来的额外时间。队员课业/可用时数未知，下表是交付日程；今晚各人认领可投入时段，先削范围再加班。

| 日期/关卡 | 你 | A+B | C+D | 当天放行条件 |
|---|---|---|---|---|
| 19 Oct 今晚，约60–90分钟 | 读懂领域、限定一旅程、验证source可达性，确认正式repo时间 | 选persona，建引用/课程表，认领角色 | 记录冲突/问官方；列影片6分钟结构；查必修workshops | 团队用一句话说明用户/决策；问题清单有负责人；不熬夜堆功能 |
| 20 Oct 晚 | source→标准技能→可解释matching的最小链路；部署第一版 | 问题证据、初版role/skill/course表、PRD骨架 | acceptance matrix、平台proof计划、8页deck骨架；补看视频 | 一个真实source能更新，产生非hardcode排序；核心不可行立即缩题/换源 |
| 21 Oct 晚 | profile/radar/matching/pathway串成可演示旅程 | 完整proposal v1与SDG/KPI假设；资料review | storyboard v1、讲稿v1、首次5–7min干跑；mentor讨论 | 至少一个synthetic用户走通；每个推荐有source，影片能讲出完整因果 |
| 22 Oct 20:00 | 核心feature freeze；两情景、变化解释、引用/错误状态；必要sponsor集成 | proposal/声明v2，补齐事实与许可 | QA核心路径；deck v1；录第一份完整粗剪 | 全六项有实现/计划映射；初赛核心工作；仍未解决的依赖有明确fallback |
| 23 Oct 18:00–22:00 | 修关键bug，锁定demo build；录屏；不接新feature | 审稿/wordcount、完成proof与技术表 | 正式录音录屏、粗剪→成片v1、上传测试与无登录播放 | 有可提交影片v1＋live URL＋6项基本齐全，24号只修复与润色 |
| 24 Oct 12:00 | release candidate/干净环境重跑 | 最终PDF、文件名、事实一致性检查 | video/deck定稿；链接check；新浏览器judge模拟 | 六项文件/links全部可访问；无placeholder；签名由leader确认 |
| 24 Oct 18:00 | 只修阻断问题 | 最终review | YouTube处理完成，确认5–7min；公开repo检查 | 三件套一致：repo代码=demo=影片 |
| 24 Oct 22:00 | leader核对最终commit/提交 | 互相check | 记录成功回执/截图，保存备份 | 已成功提交，不以点击按钮或上传中当完成 |
| 25 Oct 早于07:59:59 | 提交故障应急，按官方最新书面说明 | 待命 | 链接再核验、记录freeze | 截止后停止repo/deploy/data修改，等官方升级授权 |

影片必须在23号产生可交版本，不把所有录制/剪辑压在24号。工程开发与文档/影片自20号起并行。若20号source关卡没过，先取消所有optional features；若22号链路仍不通，保住signals→matching的真实PoC＋完整proposal覆盖六项，不虚构完成度。

建议每人保留正常睡眠，23号/24号安排一位QA交接，避免你既通宵coding又负责全部提交。具体工作小时由队员日历补齐，不把本表当作已预约事件。

## 6. 验证方案与可诚实报告的KPI

- 正确性：synthetic profile缺字段/未知技能/空source/不可达course/失效API有可理解结果；不编造来源。
- 可解释性：分数分项可复算；增加一个真实相关技能可合理减少gap；source版本/权重/情景可追踪。
- 动态性：对固定profile比较两份trend输入版本，报告哪些role/skills/pathway变化及原因；若无变化且证据不足，不强制造假排序变化。
- 可信度：推荐引用覆盖率、有效课程链接率；这些可设目标100%，但只有实测后才称达成。
- 可用性：让队员用synthetic personas做“选角色、解释缺口、找第一步课程”的任务，记录耗时/成功数/卡点；这是小样本内部测试，不能称真实用户market validation。
- Impact模板：baseline可用同样任务的手动查找耗时；KPI为完成有来源职业/路径选择的时间；例如先提出“比手动缩短30%”作为待测目标，测前不能写成结果。公平比较同一资料范围和任务条件。长期就业/收入提升是未来验证目标，不是本周证明。
- SDG：优先基于brief targets 4.4、4.3、8.2、8.5，逐项核对官方定义与对应理由；职业角色的SDG不可只是图标。预测在本周无法做长期准确率验证，明示为情景估计。

## 7. 导师与后续阶段

预约页每队一场15分钟；25 Oct停止预约，开始前24h以前可改/取消。查看时21–23 Oct有空档，尚未预约。优先考虑21 Oct能同时讨论AI/ML、product与UX的导师，或22 Oct technical/business导师；空档实时变化，以实际页为准。由队内选定可出席时间后预约，不重复占位。

15分钟内容：1min用户与问题、3min核心demo、7min三个风险（source可信度/匹配解释/原创差异）、3minscope和pitch、1min复述下一步。导师不能代做代码、文档、设计或最终决策。

25–28 Oct：遵守freeze，准备讨论/理解与后勤；不擅自改交付repo。28 Oct 20:00看结果；29 Oct 12:00前完成finalist确认及visitor form。28–30 Oct按获准升级安排补六项功能完整性、可靠性、final report与更新声明；31 Oct现场完成最终sprint，1 Nov 07:59:59前交final材料。Final 10min pitch＋5minQ&A，最终时段/房间等官方确认。

## 8. 现在可认领的下一步

- David：挑一个候选persona与角色范围，确认团队理解的核心机制，再做source接入试验与选型。
- A：读domain全文，把问题和6项要求写成一页；不用先做长deck。
- B：找真实可更新来源与真实课程，按表交付来源证据，记录许可/日期。
- C：按 VIDEO-PLAN.md 做结构与讲稿；从可运行demo安排镜头。
- D：补看8个MP4并记时间戳、发官方问题（本轮未代发）、核对workshops与Discord、组织链接验收。
