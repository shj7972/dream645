"""
꿈 데이터 1,000개 확장 스크립트
기존 200개 데이터에 추가 꿈 데이터를 생성하여 총 1,000개 이상으로 만듭니다.
"""
import json
import random

random.seed(42)  # 재현성을 위한 시드 고정

def generate_lucky_numbers():
    return sorted(random.sample(range(1, 46), 6))

# 기존 데이터 로드
with open('src/data/dreams_new.json', 'r', encoding='utf-8') as f:
    existing_dreams = json.load(f)

existing_count = len(existing_dreams)
print(f"[INFO] Existing dream count: {existing_count}")

# =============================================
# PART 1: 수동 정의 템플릿 (114개)
# =============================================
manual_templates = [
    # === 동물 관련 길몽 (10개) ===
    {"title": "하얀 말이 달려오는 꿈", "type": "good", "summary": "귀인의 도움으로 큰 성공을 거두게 됩니다. 속도감 있게 목표에 도달하며 주변의 박수갈채를 받게 됩니다.", "action_tip": "빠르게 결단하고 행동하세요. 기회는 잠깐입니다."},
    {"title": "공작새가 깃털을 활짝 펴는 꿈", "type": "good", "summary": "자신의 매력이 극대화되어 많은 사람의 주목을 받습니다. 예술적 재능이 꽃피고 인기가 급상승합니다.", "action_tip": "자신을 표현하는 데 주저하지 마세요."},
    {"title": "두꺼비가 집 마당에 앉아 있는 꿈", "type": "good", "summary": "재물이 집으로 들어올 상서로운 징조입니다. 두꺼비가 클수록 재물의 규모도 커집니다.", "action_tip": "재테크에 관심을 가져보세요."},
    {"title": "학이 나를 등에 태우고 나는 꿈", "type": "good", "summary": "장수와 귀한 복록을 동시에 얻습니다. 학문적 성취가 높아지고 존경받는 인물이 됩니다.", "action_tip": "공부나 자격증 준비에 전력을 다하세요."},
    {"title": "물고기 떼가 강을 거슬러 올라가는 꿈", "type": "good", "summary": "어려운 상황을 극복하고 역전 승리를 거둡니다. 포기하지 않는 자에게 돌아오는 보상입니다.", "action_tip": "힘들어도 조금만 더 버텨보세요."},
    {"title": "사자가 나를 호위하는 꿈", "type": "good", "summary": "강력한 보호자가 나타나 위험으로부터 지켜줍니다. 사업에서 든든한 후원자를 만나게 됩니다.", "action_tip": "자신감을 갖고 대담하게 행동하세요."},
    {"title": "고래가 바다 위로 점프하는 꿈", "type": "good", "summary": "거대한 행운이 다가옵니다. 규모가 큰 프로젝트나 사업에서 놀라운 성과를 거두게 됩니다.", "action_tip": "큰 그림을 그리며 움직이세요."},
    {"title": "봉황이 울며 하늘을 가로지르는 꿈", "type": "good", "summary": "최고의 경사가 찾아옵니다. 혼사, 합격, 승진 등 인생의 터닝포인트가 될 사건이 일어납니다.", "action_tip": "축하받을 준비를 하세요."},
    {"title": "백호가 산에서 내려오는 꿈", "type": "good", "summary": "신성한 기운이 당신을 감싸 보호합니다. 큰 위기에서 벗어나고 새로운 지위를 얻게 됩니다.", "action_tip": "두려움을 버리고 당당히 맞서세요."},
    {"title": "독수리가 먹이를 낚아채는 꿈", "type": "good", "summary": "경쟁에서 승리하고 원하는 것을 정확히 손에 넣습니다. 집중력과 결단력이 최고조입니다.", "action_tip": "목표를 정하고 과감하게 돌진하세요."},

    # === 동물 관련 흉몽 (8개) ===
    {"title": "쥐 떼가 집안을 돌아다니는 꿈", "type": "bad", "summary": "소소한 근심 걱정이 끊이지 않습니다. 작은 손실이 반복되며 신경이 예민해지는 시기입니다.", "action_tip": "작은 지출에 주의하고 건강 관리를 철저히 하세요."},
    {"title": "박쥐가 방 안을 날아다니는 꿈", "type": "bad", "summary": "어둠 속에서 불안이 찾아옵니다. 주변에 당신을 이용하려는 사람이 있을 수 있습니다.", "action_tip": "주변 인물 관계를 점검하세요."},
    {"title": "독사에게 물리는 꿈", "type": "bad", "summary": "배신이나 사기를 당할 수 있는 위험 신호입니다. 금전 거래에 특히 주의가 필요합니다.", "action_tip": "계약서를 꼼꼼히 확인하세요."},
    {"title": "까치가 유리창에 부딪히는 꿈", "type": "bad", "summary": "좋은 소식이 올 듯하다가 마지막에 무산됩니다. 기대감이 실망으로 바뀔 수 있습니다.", "action_tip": "너무 큰 기대는 금물입니다."},
    {"title": "벌에 쏘이는 꿈", "type": "bad", "summary": "예상치 못한 비용이 발생하거나 누군가의 날카로운 말에 상처를 받을 수 있습니다.", "action_tip": "감정적으로 대응하지 말고 냉정을 유지하세요."},
    {"title": "늑대 무리에 둘러싸이는 꿈", "type": "bad", "summary": "여러 방면에서 위협이 다가옵니다. 직장이나 사업에서 경쟁자들의 견제가 심해집니다.", "action_tip": "아군을 확보하고 방어 태세를 갖추세요."},
    {"title": "거미줄에 걸리는 꿈", "type": "bad", "summary": "복잡한 인간관계에 얽혀 빠져나오기 어렵게 됩니다. 불필요한 약속이나 모임을 줄이세요.", "action_tip": "관계 정리가 필요한 시점입니다."},
    {"title": "뱀이 서로 엉켜 싸우는 꿈", "type": "bad", "summary": "주변에서 다툼이 일어나고 당신도 휘말릴 수 있습니다. 시비에 끼어들지 마세요.", "action_tip": "중립을 지키는 것이 현명합니다."},

    # === 자연/환경 길몽 (8개) ===
    {"title": "벚꽃이 만개한 길을 걷는 꿈", "type": "good", "summary": "아름다운 새 시작이 찾아옵니다. 연애운이 상승하고 마음이 설레는 만남이 기다립니다.", "action_tip": "마음을 열고 새로운 인연을 맞이하세요."},
    {"title": "눈 덮인 산 정상에 서는 꿈", "type": "good", "summary": "고된 노력 끝에 정상에 도달합니다. 모든 것을 내려다볼 수 있는 높은 위치에 오르게 됩니다.", "action_tip": "마지막까지 포기하지 마세요."},
    {"title": "맑은 계곡물에서 수영하는 꿈", "type": "good", "summary": "마음의 짐이 씻겨 내려가고 건강이 회복됩니다. 정신적 여유를 되찾는 힐링의 시간입니다.", "action_tip": "자연 속에서 휴식을 취하세요."},
    {"title": "거대한 폭포 앞에 서는 꿈", "type": "good", "summary": "압도적인 에너지가 당신에게 전해집니다. 막혔던 운이 한꺼번에 터져 나오는 시기입니다.", "action_tip": "시작을 망설이던 일이 있다면 지금이 적기입니다."},
    {"title": "밤하늘에 별이 쏟아지는 꿈", "type": "good", "summary": "수많은 기회가 동시에 찾아옵니다. 선택의 폭이 넓어지고 어떤 것을 골라도 성공합니다.", "action_tip": "직감을 믿고 선택하세요."},
    {"title": "초록 잔디밭에 누워 하늘을 보는 꿈", "type": "good", "summary": "마음의 평화가 찾아오고 건강운이 상승합니다. 오랫동안 고민하던 문제가 자연스럽게 해결됩니다.", "action_tip": "여유를 가지세요. 답은 저절로 찾아옵니다."},
    {"title": "오로라를 보는 꿈", "type": "good", "summary": "인생에서 단 한 번 올까 말까 한 특별한 행운이 찾아옵니다. 신비로운 경험과 함께 영감을 얻습니다.", "action_tip": "특별한 순간을 놓치지 마세요."},
    {"title": "씨앗을 뿌리고 새싹이 돋는 꿈", "type": "good", "summary": "새로운 프로젝트가 성공적으로 시작됩니다. 작은 시작이 큰 결실로 이어질 것입니다.", "action_tip": "인내심을 가지고 꾸준히 키워나가세요."},

    # === 자연/환경 흉몽 (5개) ===
    {"title": "가뭄으로 땅이 갈라지는 꿈", "type": "bad", "summary": "정신적으로 메마른 상태입니다. 인간관계에서 소외감을 느끼고 재물운이 막힐 수 있습니다.", "action_tip": "스스로를 돌보는 시간을 가지세요."},
    {"title": "태풍에 나무가 쓰러지는 꿈", "type": "bad", "summary": "예상치 못한 큰 변화가 닥칩니다. 안정적이라 생각했던 기반이 흔들릴 수 있습니다.", "action_tip": "비상 계획을 미리 준비해 두세요."},
    {"title": "해일이 밀려오는 꿈", "type": "bad", "summary": "감당하기 어려운 문제가 한꺼번에 밀려옵니다. 감정에 휩쓸리지 말고 침착하게 대응해야 합니다.", "action_tip": "높은 곳으로 피하듯, 안전한 판단을 우선하세요."},
    {"title": "화산이 폭발하는 꿈", "type": "bad", "summary": "억눌렸던 감정이 한꺼번에 폭발할 수 있습니다. 분노 조절에 실패하면 큰 화를 불러옵니다.", "action_tip": "화가 나더라도 깊게 숨을 쉬고 한 박자 쉬세요."},
    {"title": "얼음 위를 걷다 빠지는 꿈", "type": "bad", "summary": "위험한 상황인 줄 모르고 나아가다가 갑자기 곤경에 처합니다. 방심이 화를 부릅니다.", "action_tip": "안전해 보여도 방심하지 마세요."},

    # === 태몽 (8개) ===
    {"title": "하늘에서 별이 내 품에 떨어지는 꿈", "type": "baby", "summary": "하늘의 축복을 받은 특별한 아이를 얻게 됩니다. 영리하고 재능이 넘치는 아이로 자랍니다.", "action_tip": "감사하는 마음으로 아이를 맞이하세요."},
    {"title": "무지개 물고기를 잡는 꿈", "type": "baby", "summary": "다재다능하고 개성 있는 아이를 얻게 될 아름다운 태몽입니다. 예술적 감각이 뛰어납니다.", "action_tip": "아이의 다양한 가능성을 열어주세요."},
    {"title": "탐스러운 수박을 안고 있는 꿈", "type": "baby", "summary": "건강하고 복이 많은 아이를 얻게 됩니다. 넉넉한 성품으로 주변에 사랑을 받습니다.", "action_tip": "풍성한 음식을 먹으며 건강을 챙기세요."},
    {"title": "용이 내 몸속으로 들어오는 꿈", "type": "baby", "summary": "장차 큰 인물이 될 아이를 잉태하는 최고의 태몽입니다. 권위와 명예를 모두 갖추게 됩니다.", "action_tip": "경건한 마음으로 태교에 임하세요."},
    {"title": "금반지를 주워 끼는 꿈", "type": "baby", "summary": "복덩이 아이가 태어남을 알리는 귀한 태몽입니다. 재물복과 인복을 함께 타고 납니다.", "action_tip": "소중한 것을 잘 간직하세요."},
    {"title": "흰 코끼리가 나타나는 꿈", "type": "baby", "summary": "왕족의 기운을 가진 아이를 얻는 태몽입니다. 지혜롭고 품격 있는 인물로 자라납니다.", "action_tip": "큰 뜻을 품고 아이를 키우세요."},
    {"title": "큰 배가 항구에 도착하는 꿈", "type": "baby", "summary": "풍요와 안정을 상징하는 태몽입니다. 아이가 가정에 큰 복을 가져옵니다.", "action_tip": "새로운 시작을 환영하세요."},
    {"title": "태양을 손으로 잡는 꿈", "type": "baby", "summary": "빛나는 미래를 가진 아이를 얻게 됩니다. 세상을 밝히는 리더로 성장합니다.", "action_tip": "아이에게 밝은 에너지를 전해주세요."},

    # === 일상/직업 관련 길몽 (8개) ===
    {"title": "시험에 만점을 받는 꿈", "type": "good", "summary": "노력의 결실을 맺고 인정받습니다. 자격증 시험이나 면접에서 좋은 결과가 예상됩니다.", "action_tip": "자신감을 갖고 도전하세요."},
    {"title": "새 집으로 이사하는 꿈", "type": "good", "summary": "생활 환경이 크게 개선됩니다. 새로운 시작과 함께 운이 바뀌는 전환점이 됩니다.", "action_tip": "변화를 두려워하지 마세요."},
    {"title": "오래된 친구를 만나 악수하는 꿈", "type": "good", "summary": "인맥이 살아나고 뜻밖의 도움을 받게 됩니다. 과거의 인연이 새로운 기회를 열어줍니다.", "action_tip": "연락이 끊긴 사람에게 먼저 손을 내미세요."},
    {"title": "맛있는 음식을 배불리 먹는 꿈", "type": "good", "summary": "물질적으로 풍요로워지고 만족스러운 생활을 누리게 됩니다. 건강운도 상승합니다.", "action_tip": "주변 사람들과 나누는 기쁨이 행운을 배가합니다."},
    {"title": "큰 상을 받는 꿈", "type": "good", "summary": "공적을 인정받고 명예가 높아집니다. 승진이나 표창 등 실질적인 보상이 따릅니다.", "action_tip": "겸손함을 잃지 않으면 더 큰 상이 기다립니다."},
    {"title": "새 차를 사는 꿈", "type": "good", "summary": "이동운과 사업운이 상승합니다. 새로운 수단을 얻어 더 넓은 세상으로 나아갑니다.", "action_tip": "새로운 도구나 기술을 배워보세요."},
    {"title": "결혼식을 올리는 꿈", "type": "good", "summary": "인생의 중요한 계약이나 결정이 성사됩니다. 동반자와의 관계가 더욱 깊어집니다.", "action_tip": "파트너십을 소중히 여기세요."},
    {"title": "무대에서 노래하는 꿈", "type": "good", "summary": "자신의 재능을 세상에 알리고 인정받습니다. 표현력이 향상되고 소통이 원활해집니다.", "action_tip": "자신만의 무대를 만들어 보세요."},

    # === 일상/직업 관련 흉몽 (8개) ===
    {"title": "회사에서 해고당하는 꿈", "type": "bad", "summary": "현재 위치에 대한 불안감을 반영합니다. 실제로 직장 내 위기가 올 수 있으니 대비하세요.", "action_tip": "실력을 키워 대체 불가한 존재가 되세요."},
    {"title": "시험을 보는데 아무것도 모르는 꿈", "type": "bad", "summary": "준비 부족에 대한 불안입니다. 중요한 일 앞에서 자신감이 부족한 상태입니다.", "action_tip": "더 철저히 준비하면 불안은 사라집니다."},
    {"title": "길을 잃고 헤매는 꿈", "type": "bad", "summary": "인생의 방향을 잃은 상태입니다. 결정해야 할 일 앞에서 망설이고 있습니다.", "action_tip": "잠시 멈추고 정말 원하는 것이 무엇인지 생각해 보세요."},
    {"title": "약속 시간에 늦는 꿈", "type": "bad", "summary": "중요한 기회를 놓칠 수 있습니다. 시간 관리와 약속 이행에 더 신경 써야 합니다.", "action_tip": "스케줄을 체계적으로 관리하세요."},
    {"title": "지갑에 돈이 텅 비어 있는 꿈", "type": "bad", "summary": "재정적 압박이 올 수 있습니다. 불필요한 지출을 줄이고 저축에 힘쓸 때입니다.", "action_tip": "가계부를 작성하며 지출을 점검하세요."},
    {"title": "엘리베이터가 급추락하는 꿈", "type": "bad", "summary": "갑작스러운 상황 변화에 대한 두려움입니다. 사회적 지위나 평판이 하락할 수 있습니다.", "action_tip": "기본에 충실하고 안전한 선택을 하세요."},
    {"title": "전화기가 고장 나서 통화할 수 없는 꿈", "type": "bad", "summary": "소통의 단절을 의미합니다. 중요한 사람과의 관계에 오해가 생길 수 있습니다.", "action_tip": "직접 만나서 대화하는 것이 좋습니다."},
    {"title": "다리가 무너져 건너지 못하는 꿈", "type": "bad", "summary": "목표를 향한 길이 막힙니다. 중간 과정에서 장애물이 나타나 우회해야 합니다.", "action_tip": "대안을 미리 준비해 두세요."},

    # === 신비/초자연 관련 (6개) ===
    {"title": "시간이 거꾸로 가는 꿈", "type": "good", "summary": "과거의 실수를 바로잡을 기회가 옵니다. 놓쳤던 것을 다시 잡을 수 있는 두 번째 기회입니다.", "action_tip": "과거를 후회하기보다 지금 행동하세요."},
    {"title": "투명인간이 되는 꿈", "type": "bad", "summary": "존재감이 사라지고 소외됨을 느낍니다. 주변에서 인정받지 못하는 상황입니다.", "action_tip": "자신을 적극적으로 표현하세요."},
    {"title": "거인이 되어 도시를 내려다보는 꿈", "type": "good", "summary": "영향력이 커지고 많은 사람 위에 서게 됩니다. 리더십이 발휘되는 시기입니다.", "action_tip": "큰 책임감을 가지고 행동하세요."},
    {"title": "과거로 돌아가는 꿈", "type": "bad", "summary": "현재에 만족하지 못하고 과거에 집착하고 있습니다. 앞으로 나아가야 할 때입니다.", "action_tip": "과거는 놓아주고 미래를 향해 나아가세요."},
    {"title": "날개 달린 말을 타는 꿈", "type": "good", "summary": "상상 이상의 성취를 이룹니다. 한계를 뛰어넘는 도약의 시기가 다가옵니다.", "action_tip": "불가능하다 생각한 것에 도전하세요."},
    {"title": "거울 속 자신과 대화하는 꿈", "type": "good", "summary": "자기 성찰의 시간이 필요합니다. 내면의 목소리를 듣고 진정한 자아를 발견합니다.", "action_tip": "조용한 시간을 가져보세요."},

    # === 음식/물건 관련 (8개) ===
    {"title": "금은보화가 가득한 동굴을 발견하는 꿈", "type": "good", "summary": "숨겨진 자산이나 재능을 발견합니다. 예상치 못한 곳에서 큰 이익을 얻게 됩니다.", "action_tip": "새로운 분야를 탐구해 보세요."},
    {"title": "깨진 거울을 보는 꿈", "type": "bad", "summary": "자아상에 금이 가거나 인간관계에 균열이 생깁니다. 자존감 회복이 필요합니다.", "action_tip": "자신의 가치를 스스로 인정하세요."},
    {"title": "빛나는 검을 손에 쥐는 꿈", "type": "good", "summary": "강력한 무기나 능력을 얻게 됩니다. 경쟁에서 우위를 점하고 승리합니다.", "action_tip": "새로운 기술을 배워 무장하세요."},
    {"title": "시계가 멈춘 꿈", "type": "bad", "summary": "정체된 상황이 계속됩니다. 발전이 없는 느낌에 답답해질 수 있습니다.", "action_tip": "변화의 계기를 스스로 만들어야 합니다."},
    {"title": "선물 상자를 열어보는 꿈", "type": "good", "summary": "기대하지 않았던 좋은 소식이나 선물이 찾아옵니다. 서프라이즈 이벤트가 기다립니다.", "action_tip": "열린 마음으로 받아들이세요."},
    {"title": "오래된 책에서 비밀 지도를 발견하는 꿈", "type": "good", "summary": "오랫동안 찾던 해답을 발견합니다. 지식이나 정보가 큰 이득으로 이어집니다.", "action_tip": "독서와 학습에 시간을 투자하세요."},
    {"title": "신발 끈이 자꾸 풀리는 꿈", "type": "bad", "summary": "준비가 부족한 상태에서 일을 시작하게 됩니다. 기초를 다시 점검해야 합니다.", "action_tip": "기본부터 다시 확인하세요."},
    {"title": "비단옷을 입는 꿈", "type": "good", "summary": "사회적 지위가 올라가고 품격이 높아집니다. 중요한 자리에 초대받게 됩니다.", "action_tip": "격에 맞는 준비를 해두세요."},

    # === 감정/상황 관련 (16개) ===
    {"title": "큰 소리로 웃는 꿈", "type": "good", "summary": "스트레스가 해소되고 기쁜 일이 연달아 찾아옵니다. 건강운도 함께 상승합니다.", "action_tip": "즐거운 활동을 하며 에너지를 충전하세요."},
    {"title": "끝없는 사막을 혼자 걷는 꿈", "type": "bad", "summary": "외로움과 고독의 시간입니다. 도움을 줄 사람이 없어 스스로 헤쳐 나가야 합니다.", "action_tip": "혼자서도 강해질 수 있음을 기억하세요."},
    {"title": "아기를 안고 행복해하는 꿈", "type": "good", "summary": "새로운 시작과 희망이 찾아옵니다. 프로젝트의 성공이나 좋은 소식이 기다립니다.", "action_tip": "소중한 것을 지키는 마음으로 임하세요."},
    {"title": "절벽 끝에 매달려 있는 꿈", "type": "bad", "summary": "위기 상황에 처해 있습니다. 어떤 결정을 내려야 하지만 쉽지 않은 상황입니다.", "action_tip": "침착하게 도움을 요청하세요."},
    {"title": "꽃다발을 받는 꿈", "type": "good", "summary": "사랑과 인정을 받게 됩니다. 연애운이 상승하고 주변의 축하가 이어집니다.", "action_tip": "감사의 마음을 표현하세요."},
    {"title": "감옥에 갇히는 꿈", "type": "bad", "summary": "자유를 잃고 구속되는 상황입니다. 규칙이나 의무에 억압받고 있음을 나타냅니다.", "action_tip": "스스로를 가두는 생각에서 벗어나세요."},
    {"title": "하늘을 자유롭게 나는 꿈", "type": "good", "summary": "모든 제약에서 벗어나 자유를 만끽합니다. 창의력이 폭발하고 새로운 가능성이 열립니다.", "action_tip": "틀에 박힌 사고에서 벗어나세요."},
    {"title": "미로에서 빠져나오는 꿈", "type": "good", "summary": "복잡한 문제가 해결됩니다. 오랫동안 고민하던 일에 명쾌한 답이 나옵니다.", "action_tip": "포기하지 않으면 반드시 출구가 있습니다."},
    {"title": "다이아몬드 반지를 발견하는 꿈", "type": "good", "summary": "영원한 가치를 지닌 것을 손에 넣습니다. 진정한 사랑이나 평생 가치 있는 관계를 맺게 됩니다.", "action_tip": "진짜 소중한 것이 무엇인지 생각하세요."},
    {"title": "용궁에 초대받는 꿈", "type": "good", "summary": "특별한 대우를 받고 귀한 대접을 받습니다. 사회적 위치가 크게 올라갑니다.", "action_tip": "초대에 응하고 기회를 잡으세요."},
    {"title": "빗속을 맨발로 뛰는 꿈", "type": "bad", "summary": "감정적으로 취약한 상태입니다. 보호막 없이 세상에 노출된 느낌입니다.", "action_tip": "자신만의 안전지대를 확보하세요."},
    {"title": "전생의 기억이 떠오르는 꿈", "type": "good", "summary": "깊은 자기 이해에 도달합니다. 설명할 수 없던 감정이나 끌림의 이유를 알게 됩니다.", "action_tip": "내면의 목소리에 귀를 기울이세요."},
    {"title": "동물들이 말을 하는 꿈", "type": "good", "summary": "소통 능력이 향상됩니다. 이해하지 못했던 것들이 명확해지고 통찰력이 생깁니다.", "action_tip": "경청하는 자세를 가지세요."},
    {"title": "높은 파도를 타는 꿈", "type": "good", "summary": "어려운 상황을 능숙하게 헤쳐 나갑니다. 위기를 기회로 바꾸는 능력이 생깁니다.", "action_tip": "두려움 없이 파도에 올라타세요."},
    {"title": "아이스크림이 녹아내리는 꿈", "type": "bad", "summary": "즐거움이 오래가지 않습니다. 좋은 상황이 빠르게 사라질 수 있으니 지금을 즐기세요.", "action_tip": "순간의 행복도 소중히 여기세요."},
    {"title": "노을 지는 바다를 바라보는 꿈", "type": "good", "summary": "한 시기가 아름답게 마무리됩니다. 감사한 마음과 함께 새로운 내일을 맞이합니다.", "action_tip": "지나온 시간에 감사하세요."},

    # === 추가 다양한 꿈 (19개) ===
    {"title": "정원에 나비가 가득한 꿈", "type": "good", "summary": "변화와 성장의 시기입니다. 아름다운 변신을 겪고 더 나은 사람이 됩니다.", "action_tip": "변화를 환영하세요."},
    {"title": "문이 잠겨서 열 수 없는 꿈", "type": "bad", "summary": "기회가 차단되거나 접근이 거부됩니다. 다른 방법을 찾아야 합니다.", "action_tip": "하나의 문이 닫히면 다른 문을 찾으세요."},
    {"title": "피아노를 아름답게 연주하는 꿈", "type": "good", "summary": "조화와 균형의 상태입니다. 일과 삶의 밸런스가 잘 맞고 표현력이 풍부해집니다.", "action_tip": "예술적 활동에 시간을 투자하세요."},
    {"title": "빈 방에 혼자 앉아 있는 꿈", "type": "bad", "summary": "공허함과 외로움을 느끼고 있습니다. 내면을 채울 무언가가 필요합니다.", "action_tip": "의미 있는 활동이나 사람을 찾으세요."},
    {"title": "천년된 고목나무 아래 서는 꿈", "type": "good", "summary": "오래된 지혜와 깊은 뿌리의 힘을 얻습니다. 안정감 있는 결정을 내릴 수 있습니다.", "action_tip": "전통과 경험에서 배우세요."},
    {"title": "모래시계가 다 떨어지는 꿈", "type": "bad", "summary": "시간이 촉박합니다. 서둘러야 할 일이 있거나 마감이 다가오고 있습니다.", "action_tip": "우선순위를 정하고 빠르게 행동하세요."},
    {"title": "빛의 통로를 걸어가는 꿈", "type": "good", "summary": "영적인 성장과 깨달음의 시기입니다. 삶의 목적을 찾고 올바른 길로 나아갑니다.", "action_tip": "명상이나 자기 성찰의 시간을 가지세요."},
    {"title": "금빛 열쇠를 손에 쥐는 꿈", "type": "good", "summary": "닫혀 있던 기회의 문이 열립니다. 오랫동안 풀리지 않던 문제의 해답을 찾게 됩니다.", "action_tip": "적극적으로 기회의 문을 두드리세요."},
    {"title": "오래된 우물에서 맑은 물이 솟는 꿈", "type": "good", "summary": "잊고 있던 재능이나 자원이 새로 발견됩니다. 내면의 풍요로움을 깨닫게 됩니다.", "action_tip": "과거의 경험에서 새로운 가치를 찾아보세요."},
    {"title": "거대한 나무 위에 올라가는 꿈", "type": "good", "summary": "성장과 발전의 기운이 강합니다. 높은 곳에서 더 넓은 시야를 얻게 됩니다.", "action_tip": "더 큰 목표를 세우세요."},
    {"title": "무지개 다리를 건너는 꿈", "type": "good", "summary": "힘든 시기를 지나 희망찬 미래로 나아갑니다. 소원이 이루어지는 행운의 시기입니다.", "action_tip": "희망을 품고 한 걸음씩 나아가세요."},
    {"title": "은하수를 걷는 꿈", "type": "good", "summary": "무한한 가능성의 세계가 열립니다. 상상력과 창의력이 극대화되는 시기입니다.", "action_tip": "상상하는 것을 현실로 만들어 보세요."},
    {"title": "보름달 아래서 춤추는 꿈", "type": "good", "summary": "생명력과 에너지가 충만합니다. 건강운이 상승하고 매력이 넘치는 시기입니다.", "action_tip": "자신감을 갖고 적극적으로 활동하세요."},
    {"title": "불타는 집을 바라보는 꿈", "type": "bad", "summary": "가정이나 직장에서 큰 위기가 올 수 있습니다. 소중한 것을 잃을 수 있는 경고입니다.", "action_tip": "소중한 것을 미리 지키는 대비를 하세요."},
    {"title": "치아가 빠지는 꿈", "type": "bad", "summary": "자신감 하락이나 건강 문제의 경고입니다. 가족 중 누군가의 건강에 이상이 있을 수 있습니다.", "action_tip": "건강 검진을 받고 가족의 안부를 확인하세요."},
    {"title": "물에 빠지는 꿈", "type": "bad", "summary": "감정에 압도당하고 있습니다. 스트레스나 걱정으로 인해 숨이 막히는 느낌입니다.", "action_tip": "마음의 짐을 덜어줄 사람에게 이야기하세요."},
    {"title": "비행기를 타고 이륙하는 꿈", "type": "good", "summary": "새로운 모험이 시작됩니다. 삶의 새로운 장이 열리고 시야가 넓어집니다.", "action_tip": "용기를 내어 새로운 세계로 나아가세요."},
    {"title": "폭죽이 하늘에서 터지는 꿈", "type": "good", "summary": "축하할 일이 생깁니다. 기쁜 소식이 연이어 들려오고 분위기가 밝아집니다.", "action_tip": "기쁨을 함께 나누세요."},
    {"title": "외줄타기를 하는 꿈", "type": "bad", "summary": "위험한 균형 상태에 있습니다. 작은 실수 하나가 큰 문제로 이어질 수 있습니다.", "action_tip": "신중하게 한 걸음씩 나아가세요."},
]

# =============================================
# PART 2: 조합 기반 대량 생성 (약 700개 추가)
# =============================================

# 길몽(good) 조합 소재
good_subjects = [
    ("금빛 잉어가", "재물운 상승"),
    ("흰 비둘기가", "평화와 기쁜 소식"),
    ("황금 거북이가", "장수와 부귀"),
    ("까마귀 떼가", "지혜와 통찰력"),
    ("사슴이", "순수한 행운"),
    ("토끼가", "풍요와 다산"),
    ("소가", "근면과 풍년"),
    ("매가", "출세와 성공"),
    ("호랑이가", "권력과 위엄"),
    ("잉어가", "승진과 합격"),
    ("두루미가", "학문 성취"),
    ("기린이", "경사와 길조"),
    ("거북이가", "건강과 장수"),
    ("원앙이", "사랑과 화합"),
    ("황금 뱀이", "재물 획득"),
    ("청룡이", "대업 성취"),
    ("나비가", "변화와 성장"),
    ("제비가", "기쁜 소식 전달"),
    ("앵무새가", "소통과 인연"),
    ("백조가", "우아함과 품격"),
    ("달팽이가", "느리지만 확실한 성공"),
    ("무당벌레가", "작은 행운"),
    ("햄스터가", "저축운 상승"),
    ("고양이가", "직감력 향상"),
    ("갈매기가", "자유로운 기회"),
]

good_actions = [
    "내 손 위에 앉는", "나를 향해 다가오는", "집 앞에 나타나는",
    "하늘로 올라가는", "물 위를 걸어오는", "내 주변을 맴도는",
    "내 품 안으로 들어오는", "반짝이며 빛나는", "내게 인사하는",
    "춤을 추는", "먹이를 가져다주는", "나를 인도하는",
    "행복하게 노는", "큰 소리로 우는", "알을 낳는",
]

good_summaries = [
    "가까운 미래에 행운이 찾아옵니다. 기대하지 않았던 곳에서 좋은 일이 벌어집니다.",
    "재물운이 크게 상승합니다. 투자나 사업에서 이익을 볼 수 있습니다.",
    "인생의 전환점이 다가옵니다. 새로운 기회를 잡아 도약할 수 있습니다.",
    "주변 사람들에게 인정받고 명예가 높아집니다. 승진이나 합격의 기운이 강합니다.",
    "건강운이 상승하고 활력이 넘칩니다. 새로운 활동을 시작하기 좋은 시기입니다.",
    "사랑하는 사람과의 관계가 더욱 깊어집니다. 연애운과 결혼운이 모두 상승합니다.",
    "오랫동안 바라던 소원이 이루어집니다. 정성과 노력이 결실을 맺는 시기입니다.",
    "주변 환경이 좋아지고 생활이 풍요로워집니다. 금전적으로 여유가 생깁니다.",
    "숨겨진 재능이 빛을 발합니다. 자신도 몰랐던 능력으로 성공하게 됩니다.",
    "귀인이 나타나 당신을 도와줍니다. 힘든 상황이 빠르게 호전됩니다.",
    "모든 일이 순조롭게 풀립니다. 하는 일마다 좋은 결과가 따릅니다.",
    "가족에게 기쁜 일이 생깁니다. 화목한 가정운이 강하게 작용합니다.",
    "시험이나 면접에서 좋은 결과를 얻게 됩니다. 실력을 인정받는 시기입니다.",
    "창업이나 새로운 사업이 성공적으로 출발합니다. 첫 걸음이 좋습니다.",
    "예상치 못한 보너스나 선물이 생깁니다. 금전적 행운이 따릅니다.",
]

good_tips = [
    "적극적으로 행동하면 큰 성과를 거둡니다.",
    "새로운 도전을 시작하기 좋은 시기입니다.",
    "주변 사람들에게 감사를 표현하세요.",
    "자신감을 갖고 목표를 향해 나아가세요.",
    "기회가 왔을 때 주저하지 마세요.",
    "긍정적인 마인드가 행운을 끌어당깁니다.",
    "소중한 인연을 더 가까이 하세요.",
    "건강에 신경 쓰면 더 큰 복이 옵니다.",
    "재테크에 관심을 가져보면 좋은 결과가 있습니다.",
    "주변의 조언에 귀를 기울이세요.",
    "하루를 감사하는 마음으로 시작하세요.",
    "작은 것부터 나누는 습관을 들이세요.",
]

# 흉몽(bad) 조합 소재
bad_subjects = [
    ("검은 고양이가", "불안과 의심"),
    ("까마귀가", "불길한 소식"),
    ("벌레가", "작은 문제의 누적"),
    ("구렁이가", "속임과 배신"),
    ("독수리가", "위협과 경고"),
    ("전갈이", "뒤통수와 함정"),
    ("하이에나가", "주변의 질투"),
    ("어둠 속 무언가가", "미지의 공포"),
    ("망령이", "과거의 트라우마"),
    ("유령이", "해결되지 않은 문제"),
    ("좀비가", "무기력함"),
    ("해골이", "건강 경고"),
    ("외계인이", "적응 실패"),
    ("악어가", "숨겨진 위험"),
    ("거머리가", "에너지 고갈"),
    ("독거미가", "음모와 함정"),
    ("벌 떼가", "집단적 공격"),
    ("파리 떼가", "성가신 문제"),
    ("모기 떼가", "끊이지 않는 스트레스"),
    ("들개가", "통제 불능 상황"),
]

bad_actions = [
    "나를 쫓아오는", "내 앞을 가로막는", "집안에 들어오는",
    "어둠 속에서 나타나는", "점점 가까이 다가오는", "나를 물려고 하는",
    "내 물건을 훔쳐가는", "이상한 소리를 내는", "나를 감시하는",
    "갑자기 사라지는", "내 길을 방해하는", "큰 소리로 울부짖는",
]

bad_summaries = [
    "주의가 필요한 시기입니다. 주변 사람들의 의도를 잘 살펴보세요.",
    "건강에 적신호가 올 수 있습니다. 무리하지 말고 충분히 쉬세요.",
    "금전적 손실이 발생할 수 있습니다. 큰 지출이나 투자는 자제하세요.",
    "인간관계에서 갈등이 생길 수 있습니다. 감정적 대응을 피하세요.",
    "계획대로 되지 않는 일이 생길 수 있습니다. 대안을 준비해 두세요.",
    "스트레스가 누적되어 있습니다. 마음의 여유를 찾는 것이 급선무입니다.",
    "뜻밖의 장애물이 나타날 수 있습니다. 방심하지 말고 대비하세요.",
    "과거의 문제가 다시 떠오를 수 있습니다. 미룬 일을 처리할 때입니다.",
    "주변의 부정적 영향에 휘둘릴 수 있습니다. 자신만의 중심을 잡으세요.",
    "예상치 못한 변수가 생깁니다. 유연하게 대처하는 지혜가 필요합니다.",
    "신뢰하던 사람에게 실망할 수 있습니다. 사람을 너무 쉽게 믿지 마세요.",
    "직장이나 학교에서 압박감이 커질 수 있습니다. 스트레스 관리가 중요합니다.",
]

bad_tips = [
    "차분하게 상황을 판단하세요.",
    "무리한 약속이나 결정은 피하세요.",
    "건강 검진을 받아보는 것이 좋겠습니다.",
    "감정에 흔들리지 말고 이성적으로 판단하세요.",
    "가까운 사람에게 고민을 나누세요.",
    "충분한 휴식을 취하세요.",
    "불필요한 모임이나 외출은 줄이세요.",
    "금전 관련 결정은 신중히 하세요.",
    "평소보다 말을 조심하세요.",
    "안전에 특별히 주의하세요.",
]

# 태몽(baby) 조합 소재
baby_subjects = [
    ("잘 익은 사과를", "건강한 아이"),
    ("큰 복숭아를", "복이 많은 아이"),
    ("빨간 장미를", "아름다운 여아"),
    ("큰 호박을", "듬직한 사내아이"),
    ("황금 알을", "귀한 아이"),
    ("진주 목걸이를", "품격 있는 아이"),
    ("은하수 물을", "영특한 아이"),
    ("하늘의 구름을", "자유로운 영혼의 아이"),
    ("산삼을", "건강하고 장수할 아이"),
    ("금괴를", "재물복 큰 아이"),
    ("옥구슬을", "맑고 순수한 아이"),
    ("큰 호랑이를", "용맹한 아이"),
    ("흰 사슴을", "고귀한 아이"),
    ("봉황 알을", "비범한 아이"),
    ("거대한 잉어를", "출세할 아이"),
    ("향기로운 모란꽃을", "재주 많은 아이"),
    ("빛나는 별을", "총명한 아이"),
    ("황금 거북이를", "장수할 아이"),
    ("커다란 수정 구슬을", "영감이 뛰어난 아이"),
    ("찬란한 보석을", "다재다능한 아이"),
]

baby_actions = [
    "품에 안는", "손에 쥐는", "받아드는",
    "입에 넣는", "가슴에 품는", "머리에 올리는",
    "발견하고 줍는", "하늘에서 받는", "물속에서 건지는",
    "누군가에게 선물 받는",
]

baby_summaries = [
    "하늘이 내려준 귀한 아이를 얻게 됩니다. 밝고 건강한 아이로 자랍니다.",
    "복덩이 아이를 잉태하는 좋은 태몽입니다. 가정에 행복이 가득합니다.",
    "재능이 뛰어난 아이가 태어납니다. 장래에 큰 인물이 될 기운을 타고 납니다.",
    "마음이 따뜻하고 인복이 많은 아이를 얻게 됩니다. 주변에 사랑을 나누는 아이입니다.",
    "영리하고 눈치 빠른 아이가 태어납니다. 학업에서 두각을 나타낼 것입니다.",
    "건강하고 활발한 아이를 의미합니다. 체력이 뛰어나고 운동에 소질이 있습니다.",
    "예술적 감각이 뛰어난 아이를 얻는 태몽입니다. 창의력이 넘치는 아이입니다.",
    "리더십이 강한 아이를 잉태합니다. 앞장서서 이끌어가는 인물이 됩니다.",
    "인복과 재물복을 함께 타고나는 아이입니다. 평생 풍요롭게 살아갑니다.",
    "지혜롭고 총명한 아이를 얻게 됩니다. 남다른 통찰력으로 존경받습니다.",
]

baby_tips = [
    "태교에 정성을 기울이세요.",
    "편안한 마음으로 아이를 맞이하세요.",
    "규칙적인 생활과 건강한 식단을 유지하세요.",
    "아이의 미래를 위한 계획을 세워보세요.",
    "가족과 함께 기쁨을 나누세요.",
    "감사하는 마음으로 하루를 보내세요.",
    "좋은 음악을 들으며 태교하세요.",
    "산책과 가벼운 운동으로 건강을 유지하세요.",
]

# 추가 길몽/흉몽 주제 (자연현상, 물건, 장소 등)
nature_good_templates = [
    ("맑은 샘물이 솟아나는", "good", "새로운 아이디어와 영감이 샘솟습니다. 창의적인 분야에서 큰 성과를 거둡니다."),
    ("연꽃이 활짝 피는", "good", "어려운 환경에서도 아름다운 결실을 맺습니다. 역경을 이겨내는 힘이 생깁니다."),
    ("은행잎이 노랗게 물드는", "good", "풍요로운 수확의 시기가 왔습니다. 그동안의 노력이 결실을 맺습니다."),
    ("소나기 뒤에 맑은 하늘이 보이는", "good", "힘든 시기가 지나고 밝은 미래가 펼쳐집니다. 고난 뒤의 행복이 기다립니다."),
    ("산에서 맑은 공기를 마시는", "good", "건강이 크게 회복되고 활력이 넘칩니다. 새로운 시작을 할 에너지가 충전됩니다."),
    ("바다에서 진주를 캐는", "good", "숨겨진 가치를 발견합니다. 남들이 보지 못하는 곳에서 보물을 찾게 됩니다."),
    ("풍성한 과수원을 거니는", "good", "선택의 여지가 많아집니다. 다양한 기회 중 마음에 드는 것을 고를 수 있습니다."),
    ("맑은 호수에 달이 비치는", "good", "마음이 맑아지고 판단력이 좋아집니다. 중요한 결정을 내리기 좋은 시기입니다."),
    ("새벽빛이 창문으로 들어오는", "good", "암흑 속에서 벗어나 새 희망이 시작됩니다. 오랜 기다림이 끝나는 시점입니다."),
    ("무화과나무에 열매가 가득한", "good", "숨은 노력이 열매를 맺습니다. 드러나지 않던 성과가 빛을 발합니다."),
    ("황금빛 들판을 달리는", "good", "무한한 가능성의 땅이 펼쳐집니다. 도전 정신으로 큰 보상을 얻습니다."),
    ("강에서 금모래를 발견하는", "good", "평범한 일상에서 비범한 기회를 발견합니다. 세심한 관찰이 부를 가져옵니다."),
    ("온천에서 목욕하는", "good", "몸과 마음이 회복됩니다. 그동안 쌓인 피로가 풀리고 재충전됩니다."),
    ("네잎 클로버를 발견하는", "good", "행운의 징표입니다. 작지만 확실한 행운이 일상 곳곳에 숨어 있습니다."),
    ("무지개 빛 구름 위를 걷는", "good", "꿈같은 현실이 펼쳐집니다. 상상했던 일이 실제로 이루어집니다."),
    ("맑은 시냇물을 따라 걷는", "good", "순리대로 흘러가면 좋은 결과가 있습니다. 자연의 흐름에 몸을 맡기세요."),
    ("해돋이를 산 위에서 보는", "good", "새로운 시대가 열립니다. 인생의 새 장이 시작되는 전환점입니다."),
    ("설산에서 눈꽃이 내리는", "good", "순수하고 깨끗한 시작입니다. 과거를 덮고 새롭게 출발할 수 있습니다."),
    ("사막에서 오아시스를 발견하는", "good", "절망 속에서 희망을 찾게 됩니다. 포기하려던 순간 구원이 옵니다."),
    ("동굴에서 빛을 발견하는", "good", "어둠 속에서 길을 찾습니다. 혼란스러운 상황의 출구를 발견합니다."),
]

nature_bad_templates = [
    ("천둥 번개가 치는", "bad", "갑작스러운 충격적 사건이 발생할 수 있습니다. 마음의 준비가 필요합니다."),
    ("안개 속을 헤매는", "bad", "앞이 보이지 않는 불확실한 시기입니다. 중요한 결정은 미루는 것이 좋습니다."),
    ("홍수로 집이 잠기는", "bad", "감정이 범람하여 일상이 흐트러질 수 있습니다. 마음을 안정시키는 것이 급선무입니다."),
    ("지진으로 땅이 흔들리는", "bad", "삶의 기반이 흔들리는 큰 변화가 옵니다. 안정을 되찾기 위해 노력해야 합니다."),
    ("낙엽이 우수수 떨어지는", "bad", "상실감과 허탈함이 찾아옵니다. 소중한 것을 잃을 수 있으니 지키는 노력이 필요합니다."),
    ("우박이 쏟아지는", "bad", "예기치 못한 타격을 받을 수 있습니다. 방어적인 자세가 필요합니다."),
    ("모래폭풍에 휩싸이는", "bad", "혼란의 소용돌이에 빠질 수 있습니다. 침착하게 자리를 지키는 것이 중요합니다."),
    ("늪에 빠져 허우적거리는", "bad", "빠져나오기 어려운 상황에 처합니다. 급하게 움직이면 더 깊이 빠집니다."),
    ("이끼 낀 오래된 건물에 들어가는", "bad", "과거의 문제가 다시 수면 위로 올라옵니다. 정리하지 못한 감정이 되살아납니다."),
    ("해가 두 개 뜨는", "bad", "현실과 이상 사이에서 혼란을 겪습니다. 판단력이 흐려질 수 있습니다."),
    ("빙산이 눈앞에서 깨지는", "bad", "숨겨져 있던 문제가 한꺼번에 드러납니다. 미리 대비하지 않으면 큰 피해를 봅니다."),
    ("독버섯을 먹는", "bad", "좋아 보이는 것에 속지 마세요. 달콤한 유혹 뒤에 위험이 숨어 있습니다."),
    ("가시덤불 속을 걷는", "bad", "고통과 시련의 시기입니다. 한 걸음 한 걸음이 힘들지만 인내가 필요합니다."),
    ("폐허가 된 마을을 걷는", "bad", "지난 것에 대한 아쉬움이 큽니다. 과거에 연연하면 미래가 막힙니다."),
    ("어두운 터널을 지나는", "bad", "힘든 과정을 겪어야 합니다. 그러나 끝에는 빛이 보일 것입니다."),
]

# 물건/음식 관련 추가
object_good_templates = [
    ("황금 열쇠를 줍는", "good", "중요한 기회의 문이 열립니다. 핵심적인 해답을 찾게 됩니다."),
    ("보석함을 여는", "good", "숨겨진 가치를 발견합니다. 소중한 것이 가까이에 있었음을 깨닫습니다."),
    ("맛있는 떡을 나눠 먹는", "good", "경사스러운 일이 생깁니다. 주변과 기쁨을 나누는 좋은 시기입니다."),
    ("새 양복을 맞춰 입는", "good", "새로운 역할을 맡게 됩니다. 사회적 지위가 상승하고 인정받습니다."),
    ("금화가 하늘에서 내리는", "good", "예상치 못한 큰 재물이 들어옵니다. 횡재수가 있는 시기입니다."),
    ("사다리를 타고 올라가는", "good", "단계적으로 성장합니다. 한 계단씩 확실하게 올라가는 시기입니다."),
    ("돛단배를 타고 순풍에 가는", "good", "순조로운 항해가 시작됩니다. 바람이 등을 밀어주는 행운의 시기입니다."),
    ("우산으로 비를 막는", "good", "위기에서 보호받습니다. 미리 준비한 것이 빛을 발합니다."),
    ("큰 북을 두드리는", "good", "기쁜 소식이 널리 퍼집니다. 축하할 일이 생기고 명성이 높아집니다."),
    ("항아리에서 금이 쏟아지는", "good", "재물이 넘쳐나는 대길한 꿈입니다. 사업이나 투자에서 큰 이익을 봅니다."),
    ("낚시로 큰 물고기를 잡는", "good", "오래 기다린 보상이 찾아옵니다. 인내의 결실을 거두는 시기입니다."),
    ("편지를 받는", "good", "기다리던 좋은 소식이 옵니다. 합격 통보나 기쁜 연락을 받게 됩니다."),
    ("금관을 쓰는", "good", "최고의 자리에 오릅니다. 누구도 부인할 수 없는 성취를 이룹니다."),
    ("유리구두를 신는", "good", "운명적인 만남이 기다립니다. 꿈같은 인연이 현실이 됩니다."),
    ("마법 지팡이를 손에 쥐는", "good", "원하는 것을 이룰 수 있는 힘을 얻습니다. 의지대로 상황을 바꿀 수 있습니다."),
]

object_bad_templates = [
    ("거울이 산산조각 나는", "bad", "자아상이 깨지거나 인간관계에 큰 금이 갑니다. 자존감 회복이 필요합니다."),
    ("칼에 손을 베이는", "bad", "날카로운 말이나 행동으로 상처를 받습니다. 주변 사람과의 마찰에 주의하세요."),
    ("신발이 벗겨지는", "bad", "현재의 자리를 잃을 수 있습니다. 기반이 흔들리는 느낌이 들 수 있습니다."),
    ("물건을 잃어버리는", "bad", "중요한 것을 놓칠 수 있습니다. 소중한 것을 지키는 데 집중하세요."),
    ("빈 접시를 바라보는", "bad", "기대했던 것이 없어서 실망합니다. 공허함을 채울 방법을 찾아야 합니다."),
    ("열쇠를 잃어버리는", "bad", "기회의 문이 닫힙니다. 중요한 것을 챙기지 못해 후회할 수 있습니다."),
    ("사다리가 부러지는", "bad", "올라가던 길이 갑자기 무너집니다. 승진이나 성공의 길이 막힐 수 있습니다."),
    ("배가 침몰하는", "bad", "큰 프로젝트나 계획이 실패할 수 있습니다. 리스크 관리에 주의하세요."),
    ("음식이 상한", "bad", "좋아 보이던 기회에 문제가 숨어 있습니다. 꼼꼼한 확인이 필요합니다."),
    ("시계가 거꾸로 가는", "bad", "과거로 회귀하려는 집착이 있습니다. 앞으로 나아가야 할 때입니다."),
]

# 장소/상황 관련 추가
place_good_templates = [
    ("궁전에 초대받는", "good", "높은 곳에서 인정받습니다. 사회적 지위가 크게 상승합니다."),
    ("도서관에서 빛나는 책을 발견하는", "good", "핵심적인 지식이나 정보를 얻게 됩니다. 배움의 기회가 찾아옵니다."),
    ("놀이공원에서 즐겁게 노는", "good", "일상의 스트레스가 해소되고 즐거움이 찾아옵니다. 여유를 즐기는 시기입니다."),
    ("산 정상에서 만세를 부르는", "good", "모든 것을 이뤄낸 성취감을 맛봅니다. 목표를 달성하는 환희의 순간입니다."),
    ("바닷가에서 조개를 줍는", "good", "소소한 행복이 모여 큰 기쁨이 됩니다. 일상 속 작은 행운에 감사하세요."),
    ("꽃밭에서 산책하는", "good", "평화롭고 행복한 시기입니다. 마음의 안정을 찾고 여유를 누립니다."),
    ("시장에서 활기차게 쇼핑하는", "good", "다양한 선택지가 펼쳐집니다. 원하는 것을 합리적으로 얻을 수 있습니다."),
    ("병원에서 퇴원하는", "good", "고통과 시련이 끝나고 회복의 시기가 옵니다. 건강이 좋아집니다."),
    ("무지개 위를 걷는", "good", "꿈같은 시간이 현실이 됩니다. 상상했던 것이 이루어지는 놀라운 경험을 합니다."),
    ("보물섬에 도착하는", "good", "모험의 결실을 거둡니다. 용기 있는 도전에 대한 보상이 옵니다."),
]

place_bad_templates = [
    ("지하실에 갇히는", "bad", "우울감에 빠질 수 있습니다. 어둡고 답답한 상황이 계속됩니다."),
    ("폐가에 들어가는", "bad", "과거의 상처가 되살아납니다. 이미 끝난 일에 대한 미련을 버려야 합니다."),
    ("미끄러운 경사면을 내려가는", "bad", "통제력을 잃고 미끄러져 내려갈 수 있습니다. 브레이크가 필요합니다."),
    ("시끄러운 공사장에 있는", "bad", "주변 환경이 혼란스럽습니다. 집중하기 어려운 상황이 계속됩니다."),
    ("낯선 도시에서 혼자 있는", "bad", "소속감 없이 떠돌아다니는 느낌입니다. 정착하지 못하는 불안감이 있습니다."),
    ("좁은 골목에서 빠져나오지 못하는", "bad", "선택의 폭이 좁아져 답답합니다. 탈출구를 찾기 어려운 상황입니다."),
    ("무너지는 건물에서 도망치는", "bad", "안전하다고 믿었던 것이 무너집니다. 빠른 대처가 필요합니다."),
    ("어두운 숲속을 헤매는", "bad", "방향을 잃고 혼란 속에 있습니다. 냉정하게 현재 위치를 파악해야 합니다."),
    ("높은 곳에서 아래를 내려다보며 어지러운", "bad", "현재 위치가 불안합니다. 높이 올라갈수록 떨어질 때 충격이 큽니다."),
    ("끝이 보이지 않는 계단을 오르는", "bad", "끝없는 노력에 지쳐가고 있습니다. 목표가 너무 멀게 느껴집니다."),
]

# 인간관계/감정 추가
relation_good_templates = [
    ("돌아가신 조부모님이 웃으시는", "good", "조상의 복을 받고 있습니다. 가문의 영광이 당신에게 이어집니다."),
    ("아기가 활짝 웃는", "good", "새로운 시작이 기쁨으로 가득합니다. 순수한 행복이 찾아옵니다."),
    ("연인과 손을 잡고 걷는", "good", "사랑운이 크게 상승합니다. 관계가 한 단계 발전하는 시기입니다."),
    ("가족이 모두 모여 식사하는", "good", "가정의 화목함이 유지됩니다. 가족의 건강과 행복이 보장됩니다."),
    ("스승에게 칭찬을 받는", "good", "인정과 격려를 받습니다. 성장의 기회가 주어지고 자신감이 올라갑니다."),
    ("많은 사람이 나에게 박수치는", "good", "공개적인 인정을 받습니다. 성과가 만인에게 인정받는 순간이 옵니다."),
    ("아이들이 뛰어노는 모습을 보는", "good", "미래에 대한 희망이 보입니다. 밝고 긍정적인 에너지가 전해집니다."),
    ("친구가 선물을 주는", "good", "뜻밖의 도움이나 호의를 받게 됩니다. 우정의 가치를 다시 깨닫습니다."),
]

relation_bad_templates = [
    ("연인과 헤어지는", "bad", "중요한 관계에 위기가 올 수 있습니다. 소통과 이해가 필요한 때입니다."),
    ("친구에게 배신당하는", "bad", "믿었던 사람에게 실망할 수 있습니다. 사람을 쉽게 신뢰하지 마세요."),
    ("아무도 나를 알아보지 못하는", "bad", "존재감이 사라지는 느낌입니다. 자기 존재 가치를 다시 확인해야 합니다."),
    ("다른 사람과 크게 다투는", "bad", "감정적 충돌이 예상됩니다. 한 발 물러서서 상황을 바라보세요."),
    ("장례식에 참석하는", "bad", "마무리와 이별의 시기입니다. 슬프지만 새로운 시작을 준비해야 합니다."),
    ("누군가에게 쫓기는", "bad", "피하고 싶은 문제에서 벗어날 수 없습니다. 직면하는 용기가 필요합니다."),
    ("혼자 밥을 먹는", "bad", "외로움과 소외감을 느끼고 있습니다. 먼저 손을 내밀어 관계를 회복하세요."),
    ("군중 속에서 길을 잃는", "bad", "많은 사람 속에서도 외로움을 느낍니다. 진정한 연결이 필요합니다."),
]


# ===== 조합 생성 함수 =====
def make_detail(title, type_str, summary, action_tip):
    type_label = {"good": "길몽", "bad": "흉몽", "baby": "태몽"}[type_str]
    outcome = "긍정적인 변화가 다가오고 있음을 알려줍니다." if type_str in ("good", "baby") else "주의가 필요한 시기임을 경고합니다."
    return (
        f"꿈해몽 전통에서 '{title}'은 {type_label}으로 분류됩니다. "
        f"{summary} "
        f"전통 꿈풀이 이론에 따르면 이 꿈은 당신의 현재 상황과 밀접한 관련이 있으며, "
        f"{outcome} "
        f"꿈에서 느꼈던 감정의 강도가 클수록 현실에서의 영향력도 커집니다. "
        f"이 {type_label}을 꾼 후에는 {action_tip} "
        f"동양 전통 꿈해몽에서는 이러한 유형의 꿈이 매우 의미 있는 신호로 여겨져 왔습니다."
    )


# 중복 체크용 제목 세트
existing_titles = set(d["title"] for d in existing_dreams)

all_new_dreams = []
next_id = existing_count + 1

# 1) 수동 템플릿 추가
for template in manual_templates:
    if template["title"] in existing_titles:
        continue
    title = template["title"]
    detail = make_detail(title, template["type"], template["summary"], template["action_tip"])
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": template["type"],
        "summary": template["summary"],
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": template["action_tip"],
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

print(f"[INFO] After manual templates: {len(all_new_dreams)} new dreams")

# 2) 길몽 조합 생성
for subject, meaning in good_subjects:
    for action in good_actions:
        title = f"{subject} {action} 꿈"
        if title in existing_titles:
            continue
        summary = random.choice(good_summaries)
        tip = random.choice(good_tips)
        detail = make_detail(title, "good", summary, tip)
        dream = {
            "id": f"dream_{next_id:03d}",
            "title": title,
            "type": "good",
            "summary": f"{meaning}의 기운이 강한 꿈입니다. {summary}",
            "detail": detail,
            "lucky_numbers": generate_lucky_numbers(),
            "action_tip": tip,
        }
        all_new_dreams.append(dream)
        existing_titles.add(title)
        next_id += 1

print(f"[INFO] After good combos: {len(all_new_dreams)} new dreams")

# 3) 흉몽 조합 생성
for subject, meaning in bad_subjects:
    for action in bad_actions:
        title = f"{subject} {action} 꿈"
        if title in existing_titles:
            continue
        summary = random.choice(bad_summaries)
        tip = random.choice(bad_tips)
        detail = make_detail(title, "bad", summary, tip)
        dream = {
            "id": f"dream_{next_id:03d}",
            "title": title,
            "type": "bad",
            "summary": f"{meaning}을 의미하는 꿈입니다. {summary}",
            "detail": detail,
            "lucky_numbers": generate_lucky_numbers(),
            "action_tip": tip,
        }
        all_new_dreams.append(dream)
        existing_titles.add(title)
        next_id += 1

print(f"[INFO] After bad combos: {len(all_new_dreams)} new dreams")

# 4) 태몽 조합 생성
for subject, meaning in baby_subjects:
    for action in baby_actions:
        title = f"{subject} {action} 꿈"
        if title in existing_titles:
            continue
        summary = random.choice(baby_summaries)
        tip = random.choice(baby_tips)
        detail = make_detail(title, "baby", summary, tip)
        dream = {
            "id": f"dream_{next_id:03d}",
            "title": title,
            "type": "baby",
            "summary": f"{meaning}을 의미하는 태몽입니다. {summary}",
            "detail": detail,
            "lucky_numbers": generate_lucky_numbers(),
            "action_tip": tip,
        }
        all_new_dreams.append(dream)
        existing_titles.add(title)
        next_id += 1

print(f"[INFO] After baby combos: {len(all_new_dreams)} new dreams")

# 5) 자연현상 길몽 추가
for title_prefix, type_str, summary in nature_good_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(good_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 6) 자연현상 흉몽 추가
for title_prefix, type_str, summary in nature_bad_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(bad_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 7) 물건 관련 길몽 추가
for title_prefix, type_str, summary in object_good_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(good_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 8) 물건 관련 흉몽 추가
for title_prefix, type_str, summary in object_bad_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(bad_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 9) 장소 관련 길몽 추가
for title_prefix, type_str, summary in place_good_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(good_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 10) 장소 관련 흉몽 추가
for title_prefix, type_str, summary in place_bad_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(bad_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 11) 인간관계 길몽 추가
for title_prefix, type_str, summary in relation_good_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(good_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# 12) 인간관계 흉몽 추가
for title_prefix, type_str, summary in relation_bad_templates:
    title = f"{title_prefix} 꿈"
    if title in existing_titles:
        continue
    tip = random.choice(bad_tips)
    detail = make_detail(title, type_str, summary, tip)
    dream = {
        "id": f"dream_{next_id:03d}",
        "title": title,
        "type": type_str,
        "summary": summary,
        "detail": detail,
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": tip,
    }
    all_new_dreams.append(dream)
    existing_titles.add(title)
    next_id += 1

# ===== 최종 합치기 =====
final_dreams = existing_dreams + all_new_dreams

print(f"\n========== RESULT ==========")
print(f"Existing dreams: {existing_count}")
print(f"New dreams added: {len(all_new_dreams)}")
print(f"Total dreams: {len(final_dreams)}")

good_count = sum(1 for d in final_dreams if d["type"] == "good")
bad_count = sum(1 for d in final_dreams if d["type"] == "bad")
baby_count = sum(1 for d in final_dreams if d["type"] == "baby")
print(f"  Good: {good_count}, Bad: {bad_count}, Baby: {baby_count}")

# 저장
with open("src/data/dreams_new.json", "w", encoding="utf-8") as f:
    json.dump(final_dreams, f, ensure_ascii=False, indent=2)

print(f"\nSaved to src/data/dreams_new.json successfully!")
