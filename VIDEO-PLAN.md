# 初赛影片与 deck 制作计划

官方：5–7分钟YouTube pitch＋prototype demo，超时按每30秒1分扣分（subject to final rules）。建议目标6:15，实际剪完用播放器核对；本文是分镜与内容框架，尚不是可提交影片、最终讲稿或成片。

## 1. 6分15秒叙事

| 时间 | 画面/slide | 讲清的事实 | 主责 |
|---|---|---|---|
| 0:00–0:35 | 具体synthetic persona与决策 | 当前技能/学习时间/为什么难选择下一步；声明为合成例子 | Pitch |
| 0:35–1:10 | 问题证据与产品价值 | 1–2个可核对出处；本队聚焦用户，避免堆无来源数字 | Pitch/Research |
| 1:10–1:35 | 系统全链路概览 | signals→matching→gap→pathway→SDG；本轮已实现/计划分明 | Pitch |
| 1:35–2:05 | 实际app的profile | synthetic sample、一组技能与每周可学时间，展示可编辑输入 | Tech demo |
| 2:05–2:55 | radar/来源与更新 | 真实source、日期、变更；展示input/refresh，不播放假实时动画冒充数据 | Tech demo |
| 2:55–3:45 | role ranking与解释 | top roles、分数组成、missing skills；moderate/fast情景及不同假设 | Tech demo |
| 3:45–4:30 | pathway/SDG | 第一周可执行行动、真实课程、时间估计；role/skill的SDG理由 | Tech demo |
| 4:30–5:05 | 一页架构 | 核心方法、AI负责什么、Replit/RunPod/API Premium真实用途与proof | Tech/Pitch |
| 5:05–5:45 | 验证与风险 | 实测范围/指标/样本，预测不确定性、来源限制、fallback；未做测量不能填效果 | QA/Pitch |
| 5:45–6:15 | Phase2与收尾 | 六项must-have覆盖/剩余工作、下一步、价值一句话 | Pitch |

如果初赛只跑通核心功能，镜头聚焦真实signals→matching，把其他功能作为清晰标注的planned UI或roadmap；不能剪辑成全部已完成。

## 2. 8页 deck 建议

1. 项目名、一句价值、团队/domain。
2. 具体用户与moment of need＋证据。
3. 方法与差异：动态证据、稳健选择、SDG理由。
4. 核心demo入口/用户旅程（此时切到app）。
5. Architecture/AI boundaries/sponsor usage。
6. Measured validation＋SDG baseline/KPI/target（区分实测、估计、目标）。
7. 六项必需能力的implemented/planned映射＋风险与fallback。
8. Phase2计划与收尾、主要来源/项目链接。

不把完整README塞入deck。来源用短注并在文档提供完整URL；实际稿优先英文，需团队确认语言偏好。口播按排练时长调整，不以单纯词数保证6分钟。

## 3. 素材与录制分工

- Tech：提供锁定build、synthetic persona、可复现demo步骤、清晰架构、30秒技术解释；录屏前关闭通知和含secrets的窗口。
- Research：每个数字/课程/role对应来源、日期与许可；主张没有证据则删或改为待验证假设。
- Pitch：统一讲稿、录音、转场与字幕；不要求所有5人逐一出镜而挤占demo，除非官方教程另要求。
- QA：核对字幕/链接/功能/分数一致，检查隐私，完整看一遍成片、记录时长和缺陷。

建议1080p、系统声音关闭/麦克风清楚、鼠标移动慢、浏览器100%或适合屏幕比例；这些是制作建议，不是官方格式规定。Demo镜头优先输入→真实变化→可解释输出，减少loading和无意义滚动。剪辑可去等待，不能拼接不存在的运行结果；明确哪些是缓存或测试情景。

## 4. 制作时间闸门

| 关卡 | 时间 MYT | 交付 |
|---|---|---|
| storyboard v1 | 21 Oct 晚 | 8页结构、每段事实和待补镜头 |
| first full rough take | 22 Oct 晚 | 第一份能从头播到尾的影片，暴露叙事/技术缺口 |
| 正式录屏/录音 | 23 Oct | demo已稳定，产品名/数字/版本固定 |
| 可交成片v1 | 23 Oct 晚 | 5–7min影片、YouTube测试链接 |
| 最终内容锁定 | 24 Oct 12:00 | deck/video/docs一致；最后字幕与音量修复 |
| 上传处理/独立播放核验 | 24 Oct 18:00前 | 无登录可播放，无权限/版权阻断；README链接有效 |
| 完整提交 | 24 Oct 22:00目标 | 保存最终链接、commit、提交成功证据 |

## 5. 发布前验收

- [ ] 5:00–7:00之间，目标约6:15；开头/片尾也计入。
- [ ] YouTube链接可访问并已处理完成；可考虑unlisted，前提是官方教程没要求public，不能设private。
- [ ] 有实际prototype演示，不只是slides/静态UI。
- [ ] 核心signals→matching有来源/日期/可解释变化。
- [ ] 场景假设、synthetic personas、缓存、未实现功能都诚实标注。
- [ ] 主要数据/推荐/课程/统计引用可核对，无编造效果。
- [ ] API/平台使用与技术声明一致，无真实CV、secret、付款或私有邀请资料。
- [ ] 用另一浏览器完整播放，声音、字幕、画面可读；时长不超。
- [ ] GitHub README、proposal、deck、live demo、video链接相互一致。

## 6. 决赛延展

入围后另做10min live pitch＋5min Q&A，并准备backup recorded pitch。初赛分数不带入决赛，按新rubric重排重点；不能只把6分钟影片放慢成10分钟。准备“为什么不是普通chatbot、数据更新依据、分数含义、情景假设、SDG的实际作用、AI幻觉防护、运行成本、赞助资源、隐私、公平性与测量局限”的回答。Final现场pitch时间与房间目前文件互相冲突，等官方排期。
