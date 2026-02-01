import json
import random

def generate_lucky_numbers():
    return sorted(random.sample(range(1, 46), 6))

dreams = [
    # --- 돼지/동물 관련 (길몽 중심) ---
    {
        "id": "dream_001",
        "title": "황금돼지가 집안으로 들어오는 꿈",
        "type": "good",
        "summary": "금전운이 크게 상승할 징조입니다. 뜻밖의 횡재수나 사업이 번창하여 큰 재물을 모으게 될 것입니다. 돼지의 크기가 클수록 운의 크기도 커집니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "오늘 하루는 적극적으로 투자나 복권 구매를 고려해보세요. 자신감이 행운을 부릅니다."
    },
    {
        "id": "dream_002",
        "title": "용이 하늘로 승천하는 꿈",
        "type": "good",
        "summary": "명예와 지위가 올라갈 길몽 중의 길몽입니다. 수험생은 합격, 직장인은 승진, 창작자는 대중의 인기를 얻게 될 환상적인 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "주변 사람들에게 겸손함을 유지하면서도 당신의 능력을 유감없이 발휘하세요."
    },
    {
        "id": "dream_003",
        "title": "호랑이가 나를 품에 안는 꿈",
        "type": "baby",
        "summary": "장차 큰 지도자가 될 아이를 얻게 될 태몽입니다. 강한 리더십과 지혜를 가진 아이로 성장하여 가문을 빛낼 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "태교에 힘쓰며 마음을 평온하게 유지하세요. 귀한 인연이 찾아오고 있습니다."
    },
    {
        "id": "dream_004",
        "title": "까마귀가 집 위에서 우는 꿈",
        "type": "bad",
        "summary": "집안에 좋지 않은 소식이 들려오거나 구설수에 휘말릴 수 있습니다. 건강이나 일변의 위협에 주의해야 할 시기입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "말조심과 행동 조심이 필수입니다. 새로운 일을 시작하기보다 기존의 것을 지키는 것이 좋습니다."
    },
    {
        "id": "dream_005",
        "title": "백사가 내 다리를 감는 꿈",
        "type": "baby",
        "summary": "성품이 곧고 지혜로운 딸을 얻게 될 정갈한 태몽입니다. 예술적 감각이나 학문적 소질이 뛰어날 가능성이 큽니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "주변의 시샘을 경계하고 맑은 기운을 유지하도록 노력하세요."
    },
    {
        "id": "dream_006",
        "title": "커다란 잉어가 물 밖으로 튀어나오는 꿈",
        "type": "good",
        "summary": "입신양명과 재물 획득의 상징입니다. 잉어가 크고 생생할수록 당신이 얻게 될 성취도 거대할 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "현재 추진 중인 일에 더욱 속도를 내보세요. 결실이 코앞에 있습니다."
    },
    {
        "id": "dream_007",
        "title": "독수리가 나를 낚아채 하늘을 나는 꿈",
        "type": "good",
        "summary": "강력한 조력자를 만나 신분 상승을 하게 될 꿈입니다. 혼자 해결하기 힘들었던 문제들이 타인의 도움으로 쉽게 풀리게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "대인관계에 신경을 쓰며 귀인의 조언을 귀담아들으세요."
    },
    {
        "id": "dream_008",
        "title": "개가 사납게 짖어대며 쫓아오는 꿈",
        "type": "bad",
        "summary": "믿었던 사람으로부터 배신을 당하거나 가까운 지인과 불화가 생길 수 있습니다. 대인관계에서 예상치 못한 갈등이 발생합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "너무 솔직한 감정표현은 독이 될 수 있습니다. 잠시 거리를 두는 것도 지혜입니다."
    },
    {
        "id": "dream_009",
        "title": "작은 새들이 지저귀며 내 손에 앉는 꿈",
        "type": "good",
        "summary": "기쁜 소식이 들려오거나 소소한 행복이 연달아 찾아오는 꿈입니다. 연인과의 관계가 돈독해지거나 새로운 친구를 사귈 수도 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "주변에 친절을 베푸세요. 그 친절이 더 큰 행운으로 돌아옵니다."
    },
    {
        "id": "dream_010",
        "title": "뱀이 몸을 칭칭 감는 꿈",
        "type": "good",
        "summary": "재물운이 따르거나 새로운 이성과의 뜨거운 만남이 기다리고 있습니다. 태몽이라면 활동적인 아이를 상징합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "열정을 쏟을 수 있는 대상을 찾아보세요. 당신의 에너지가 최고조에 달해 있습니다."
    },
    # --- 재물/운세 관련 ---
    {
        "id": "dream_011",
        "title": "똥을 만지거나 온몸에 뒤집어쓰는 꿈",
        "type": "good",
        "summary": "가장 대표적인 횡재 꿈입니다. 더럽다고 느껴지지 않을수록 더 큰 재물이 들어옵니다. 투자나 사업에서 큰 이익을 보게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "이 기회를 놓치지 마세요. 과감한 결정이 부를 창출합니다."
    },
    {
        "id": "dream_012",
        "title": "집에 불이 나서 활활 타오르는 꿈",
        "type": "good",
        "summary": "사업이나 장사가 번창하여 큰 부를 쌓게 될 징조입니다. 불길이 거셀수록 그 기세는 더욱 강력해집니다. 가산이 풍족해질 귀한 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "활기차게 움직이세요. 타오르는 불길처럼 당신의 운세도 타오르고 있습니다."
    },
    {
        "id": "dream_013",
        "title": "조상님이 나타나 번호를 가르쳐주는 꿈",
        "type": "good",
        "summary": "조력자나 영적인 기운이 당신을 돕고 있습니다. 현실에서의 난관이 조상의 보살핌으로 해결되며 큰 복을 받게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "조상님에 대한 감사의 마음을 갖고, 오늘 기억난 숫자가 있다면 꼭 활용해보세요."
    },
    {
        "id": "dream_014",
        "title": "지갑을 잃어버리는 꿈",
        "type": "bad",
        "summary": "재산상 손실이 발생하거나 권리를 잃게 될 수 있습니다. 소중하게 생각하던 것들이 빠져나가는 운세이므로 주의가 필요합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "당분간 지출을 줄이고 자산 관리에 철저를 기하세요. 투자는 금물입니다."
    },
    {
        "id": "dream_015",
        "title": "돈다발을 줍는 꿈",
        "type": "good",
        "summary": "예상치 못한 수입이 생기거나 계약 성사, 진급 등의 경사가 따릅니다. 현실에서도 금전적 여유가 생기게 될 긍정적인 신호입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "들어온 돈을 지혜롭게 관리하는 것이 중요합니다. 나눔을 실천하면 운이 더 오래 유지됩니다."
    },
    {
        "id": "dream_016",
        "title": "길에서 보석을 줍는 꿈",
        "type": "good",
        "summary": "자신의 가치를 인정받거나 소중한 아이디어를 얻게 됩니다. 창작자에게는 영감이, 구직자에게는 좋은 직장이 나타날 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신의 재능을 세상에 널리 알리세요. 빛나는 당신의 능력이 빛을 볼 차례입니다."
    },
    {
        "id": "dream_017",
        "title": "금괴가 가득 담긴 상자를 받는 꿈",
        "type": "good",
        "summary": "인생의 큰 기회가 찾아옵니다. 막대한 부와 명예가 따라오며 주변 사람들의 부러움을 사게 될 대길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "준비된 자에게 기회가 옵니다. 지금까지 노력해온 결실을 당당히 받으세요."
    },
    {
        "id": "dream_018",
        "title": "복권에 당첨되는 꿈을 꾸는 꿈",
        "type": "good",
        "summary": "실제로 복권에 당첨될 가능성도 있지만, 주로 간절히 바라던 바가 이루어지거나 생활 형편이 나아짐을 의미합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "희망을 잃지 마세요. 긍정적인 에너지가 당신을 더 나은 곳으로 인도할 것입니다."
    },
    {
        "id": "dream_019",
        "title": "하늘에서 돈이 비처럼 쏟아지는 꿈",
        "type": "bad",
        "summary": "역설적으로 지나친 욕심이 화를 부를 수 있음을 경고합니다. 과시용 지출이나 허황된 꿈에 빠져 실제 자산을 잃을 위험이 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "현실적인 감각을 유지하세요. 허상을 쫓기보다 내실을 다지는 것이 중요합니다."
    },
    {
        "id": "dream_020",
        "title": "은행에 저금을 많이 하는 꿈",
        "type": "good",
        "summary": "안정적인 미래가 설계되고 있음을 의미합니다. 꾸준한 노력이 결실을 맺어 탄탄한 기반을 갖추게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "적금이나 연금 등 장기적인 계획을 세우기에 최적의 시기입니다."
    },
    # --- 신체/건강/사건 관련 ---
    {
        "id": "dream_021",
        "title": "이빨이 우수수 빠지는 꿈",
        "type": "bad",
        "summary": "주변 사람들(가족, 친척, 지인)에게 우환이 생기거나 본인의 건강이 악화될 수 있음을 알리는 경고성 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "오늘 하루는 연락이 뜸했던 지인들에게 안부를 묻고 건강검진을 예약해보세요."
    },
    {
        "id": "dream_022",
        "title": "나의 몸에서 피가 철철 흐르는 꿈",
        "type": "good",
        "summary": "꿈에서 피는 생명력과 재물을 상징합니다. 자신의 피를 보는 것은 그만큼 강한 에너지가 응축되어 큰 재물이 들어올 것임을 의미합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "열정적으로 일에 매달려보세요. 당신의 노력이 황금빛 열매로 돌아올 것입니다."
    },
    {
        "id": "dream_023",
        "title": "높은 곳에서 떨어지는 꿈",
        "type": "bad",
        "summary": "지위나 명성이 추락하거나 심리적으로 큰 불안감을 느끼고 있을 때 나타납니다. 신뢰하고 있던 사람과의 관계에 금이 갈 수도 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "마음의 평안을 찾는 휴식이 필요합니다. 너무 급하게 서두르지 말고 천천히 대처하세요."
    },
    {
        "id": "dream_024",
        "title": "머리카락을 짧게 자르는 꿈",
        "type": "bad",
        "summary": "새로운 시작을 의미하기도 하지만, 가정에 불화가 생기거나 뜻밖의 장애물이 생겨 고전하게 될 수 있음을 시사합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "변화를 꾀하기 전에 먼저 주변을 정리정돈하고 차분하게 생각할 시간을 가지세요."
    },
    {
        "id": "dream_025",
        "title": "벌거벗은 채로 거리를 활보하는 꿈",
        "type": "bad",
        "summary": "자신의 비밀이 폭로되거나 부끄러운 일에 직면하여 고립될 수 있습니다. 심리적으로 매우 취약해진 상태를 반영합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "함부로 속마음을 털어놓지 말고 보안에 신경 쓰세요. 신중한 행동이 창피함을 막아줍니다."
    },
    {
        "id": "dream_026",
        "title": "목욕을 깨끗이 하는 꿈",
        "type": "good",
        "summary": "묵은 때를 벗겨내듯 근심과 걱정이 사라지고 건강이 회복됩니다. 새로운 마음가짐으로 새 출발을 할 수 있는 밝은 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "과거의 미련을 버리고 앞으로의 미래만 생각하세요. 운이 새롭게 트이고 있습니다."
    },
    {
        "id": "dream_027",
        "title": "피눈물을 흘리는 꿈",
        "type": "bad",
        "summary": "극심한 슬픔이나 고통스러운 사건이 닥칠 수 있음을 예고합니다. 정신적인 충격에 대비하고 마음을 강하게 먹어야 합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "혼자 고민하지 말고 전문가나 믿을 만한 사람에게 도움을 요청하세요."
    },
    {
        "id": "dream_028",
        "title": "눈이 안 보여 앞이 캄캄한 꿈",
        "type": "bad",
        "summary": "진행 중인 일이 방향을 잃거나 막막한 상황에 처하게 됩니다. 판단력이 흐려져 실수를 할 가능성이 높습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "지금은 멈춰야 할 때입니다. 정보를 수집하고 다시 한번 계획을 검토하세요."
    },
    {
        "id": "dream_029",
        "title": "날개가 돋아 하늘로 날아오르는 꿈",
        "type": "good",
        "summary": "자유와 성취를 상징합니다. 억눌려 있던 것들로부터 해방되고 자신의 능력을 넓은 세상에 떨치게 될 매우 희망적인 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "더 넓은 세계로 시야를 돌리세요. 당신의 무대는 생각보다 훨씬 큽니다."
    },
    {
        "id": "dream_030",
        "title": "키가 부쩍 자라 전봇대보다 커지는 꿈",
        "type": "good",
        "summary": "사회적 영향력이 확대되고 강력한 카리스마를 갖게 됩니다. 대중을 이끄는 리더로 부상할 기운이 가득합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신의 목소리에 힘을 실으세요. 사람들이 당신의 말에 귀를 기울일 준비가 되었습니다."
    },
    # --- 자연/환경 관련 ---
    {
        "id": "dream_031",
        "title": "맑은 샘물이 바닥에서 솟구치는 꿈",
        "type": "good",
        "summary": "창의적인 영감이 샘물처럼 솟아나고 재물이 끊임없이 들어올 길몽입니다. 학업 성취나 예술 활동에 큰 성과가 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "새로운 아이디어를 기록하고 바로 실행에 옮기세요. 현재의 흐름이 매우 좋습니다."
    },
    {
        "id": "dream_032",
        "title": "푸른 바다가 끝없이 펼쳐진 풍경을 보는 꿈",
        "type": "good",
        "summary": "마음의 평화와 안정을 찾으며 대인운이 넓어집니다. 해외와 관련된 사업이나 여행에서 좋은 기회를 얻게 될 수 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "여행 계획을 세우거나 외국어 공부를 시작해보는 것은 어떨까요? 행운의 문이 열립니다."
    },
    {
        "id": "dream_033",
        "title": "태양이 반으로 쪼개지는 꿈",
        "type": "bad",
        "summary": "사회적인 혼란이나 지도층의 불화, 혹은 집안의 가장에게 좋지 않은 일이 생길 수 있음을 암시합니다. 큰 변화에 주의하십시오.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "조직 내의 갈등에서 중립을 지키고 자신의 자리를 굳건히 하세요."
    },
    {
        "id": "dream_034",
        "title": "산신령이 나타나 지팡이를 주는 꿈",
        "type": "good",
        "summary": "강력한 조력자의 도움으로 난관을 극복하고 큰 뜻을 펼치게 됩니다. 앞이 캄캄했던 문제에 명확한 해답을 얻게 될 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "어려운 일이 있다면 주저 말고 멘토나 선배에게 조언을 구하세요."
    },
    {
        "id": "dream_035",
        "title": "지진이 일어나 집이 무너지는 꿈",
        "type": "bad",
        "summary": "기존의 가치관이나 환경이 완전히 뒤바뀌는 격변의 시기가 올 것을 의미합니다. 정신적인 스트레스와 불안이 동반됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "변화의 파도에 맞서기보다 유연하게 대처하는 지혜가 필요합니다. 기초를 다시 점검하세요."
    },
    {
        "id": "dream_036",
        "title": "무지개가 우리 집 마당에 걸리는 꿈",
        "type": "good",
        "summary": "경사스러운 소식과 함께 온 가족이 기쁨을 만끽하게 될 꿈입니다. 혼사가 성사되거나 기다리던 소식이 찾아옵니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "가족들과 맛있는 식사를 하며 즐거운 시간을 보내세요. 행복이 배가 될 것입니다."
    },
    {
        "id": "dream_037",
        "title": "우박이 쏟아져 온통 하얗게 변하는 꿈",
        "type": "bad",
        "summary": "예상치 못한 천재지변이나 사고로 재물에 손실을 입을 수 있습니다. 하는 일마다 훼방꾼이 나타나 골치를 썩게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "무모한 모험은 피하고 철저한 계획하에 움직이세요. 소나기는 피해가는 것이 상책입니다."
    },
    {
        "id": "dream_038",
        "title": "숲길을 걷다가 향기로운 꽃을 발견하는 꿈",
        "type": "good",
        "summary": "뜻밖의 인연을 만나거나 미적으로 아름다운 결실을 맺게 되는 꿈입니다. 연애운이 급상승하며 삶의 활력이 넘쳐납니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신의 외모를 가꾸고 적극적으로 모임에 참여해보세요. 멋진 인연이 기다립니다."
    },
    {
        "id": "dream_039",
        "title": "번개가 번쩍이며 천둥소리가 들리는 꿈",
        "type": "good",
        "summary": "깜짝 놀랄 만한 기쁜 소식이 찾아오거나 세상 사람들의 주목을 받을 만한 성과를 내게 될 역동적인 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신의 능력을 과감하게 어필하세요. 지금이 바로 스포트라이트를 받을 때입니다."
    },
    {
        "id": "dream_040",
        "title": "안개가 자욱하여 길을 잃는 꿈",
        "type": "bad",
        "summary": "누군가로부터 사기를 당하거나 감언이설에 속아 넘어가 손해를 볼 수 있습니다. 시야가 흐려진 상태니 매사에 의심해봐야 합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "달콤한 제안일수록 단호하게 거절하세요. 팩트 체크가 절대적으로 필요한 시기입니다."
    },
    # --- 인물/태몽/가족 관련 ---
    {
        "id": "dream_041",
        "title": "대통령이나 유명 인사와 식사하는 꿈",
        "type": "good",
        "summary": "최고의 권위자로부터 인정을 받거나 사회적으로 지위가 급부상하게 될 징조입니다. 막강한 영향력을 가진 조력자를 얻게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "원대한 목표를 세우세요. 지금은 무엇을 해도 성공할 수 있는 강력한 운세입니다."
    },
    {
        "id": "dream_042",
        "title": "갓 피어난 연꽃 위에 아기가 앉아 있는 꿈",
        "type": "baby",
        "summary": "자애롭고 성스러운 기운을 타고난 아이를 얻게 될 거룩한 태몽입니다. 장차 사회에 큰 공헌을 할 인물로 자라납니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "경건한 마음으로 아이를 맞이할 준비를 하세요. 축복받은 영혼이 당신을 찾아왔습니다."
    },
    {
        "id": "dream_043",
        "title": "죽은 지인이 나타나 슬프게 우는 꿈",
        "type": "bad",
        "summary": "영적인 경고입니다. 당신이 가고 있는 길이 잘못되었거나 조만간 곤란한 처지에 놓일 수 있음을 조상이 슬퍼하는 모습입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "현재의 생활 패턴을 돌아보고 고칠 점은 없는지 냉정하게 평가해보세요."
    },
    {
        "id": "dream_044",
        "title": "빨간 사과가 주렁주렁 열린 나무에서 사과를 따는 꿈",
        "type": "baby",
        "summary": "탐스럽고 영리한 아이를 얻게 될 예쁜 태몽입니다. 재물복도 타고났으며 주변 사람들에게 사랑을 듬뿍 받는 성격입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "과일이나 비타민을 챙겨 먹으며 건강한 신체를 유지하세요. 예쁜 기운이 가득합니다."
    },
    {
        "id": "dream_045",
        "title": "귀신에게 쫓겨 막다른 길에 다다르는 꿈",
        "type": "bad",
        "summary": "심한 정신적 고통이나 질병에 노출될 위험이 있습니다. 누군가로부터 위협을 받거나 가위눌림 현상이 나타날 수도 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "충분한 숙면과 심신 안정이 최우선입니다. 스트레스 요인을 과감히 차단하세요."
    },
    {
        "id": "dream_046",
        "title": "금색 잉어가 내 품에 쏙 들어오는 꿈",
        "type": "baby",
        "summary": "장차 큰 재력가가 될 아이를 얻게 될 길한 태몽입니다. 효심이 깊고 명석한 두뇌를 가진 아이로 성장하게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "아이의 미래를 위해 좋은 책을 읽거나 아름다운 음악을 들으세요."
    },
    {
        "id": "dream_047",
        "title": "연예인과 결혼식을 올리는 꿈",
        "type": "good",
        "summary": "사람들의 관심과 부러움을 한 몸에 받게 될 일이 생깁니다. 명성이 올라가고 대인 관계가 화려해질 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자기계발에 투자하세요. 당신의 매력이 가장 극대화되는 시기입니다."
    },
    {
        "id": "dream_048",
        "title": "모르는 어린아이가 내 손을 잡고 놓지 않는 꿈",
        "type": "bad",
        "summary": "귀찮은 일이나 책임져야 할 부담스러운 사건에 휘말릴 수 있습니다. 구설수나 근심거리가 한동안 떠나지 않을 기운입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "거절할 때는 단호하게 거절하세요. 어설픈 호의가 화살로 돌아올 수 있습니다."
    },
    {
        "id": "dream_049",
        "title": "크고 빛나는 옥수수를 한아름 안는 꿈",
        "type": "baby",
        "summary": "성실하고 건강한 아이를 의미하는 태몽입니다. 장성하여 실속 있는 인품과 풍요로운 삶을 누리게 될 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자연의 기운을 느끼며 산책을 해보세요. 생명력이 넘치는 하루가 될 것입니다."
    },
    {
        "id": "dream_050",
        "title": "돌아가신 부모님이 환하게 웃으며 머리를 쓰다듬어 주시는 꿈",
        "type": "good",
        "summary": "큰 액운이 물러가고 집안에 평화가 찾아옵니다. 하려는 일마다 조상의 보살핌으로 순조롭게 풀리게 될 매우 따뜻한 길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "부모님께 감사하는 마음을 갖고, 성묘를 가거나 가족들을 살뜰히 챙기세요."
    },
    # --- 추가 50개는 간략하게 또는 테마별로 확장 ---
    {
        "id": "dream_051",
        "title": "황금 들판을 바라보는 꿈",
        "type": "good",
        "summary": "풍년과 번창의 상징입니다. 노력해온 일들이 마침내 황금빛 결실을 맺어 경제적으로 아주 풍족해질 시기입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "수확의 시기입니다. 겸손하게 그러나 당당하게 결과를 즐기세요."
    },
    {
        "id": "dream_052",
        "title": "검은 고양이가 눈을 부라리며 쳐다보는 꿈",
        "type": "bad",
        "summary": "사기나 도둑, 혹은 자신의 물건을 잃어버릴 수 있는 불운을 경고합니다. 주변에 믿지 못할 사람이 숨어 있을 수 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "소지품 관리를 철저히 하고 모르는 사람의 접근을 경계하세요."
    },
    {
        "id": "dream_053",
        "title": "큰 호랑이가 집안으로 들어와 앉는 꿈",
        "type": "good",
        "summary": "가문이 번창하고 큰 권력을 쥐게 될 아이를 얻거나, 본인이 사회적으로 강력한 배경을 얻게 됨을 의미합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "당당한 태도가 행운을 불러옵니다. 기죽지 말고 목표를 향해 나아가세요."
    },
    {
        "id": "dream_054",
        "title": "신발의 짝이 맞지 않아 당황하는 꿈",
        "type": "bad",
        "summary": "연인이나 파트너와의 불화, 혹은 하려는 업무의 조건이 맞지 않아 고통받게 될 징조입니다. 조화가 깨진 상태를 뜻합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "상대방의 입장에서 생각해보는 역지사지의 자세가 절실합니다."
    },
    {
        "id": "dream_055",
        "title": "커다란 구렁이가 지붕 위에 도사리고 있는 꿈",
        "type": "baby",
        "summary": "학문이나 예술 분야에서 세상을 놀라게 할 대가의 기운을 가진 아이를 얻는 태몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "지적인 호기심을 자극할 수 있는 활동을 시작해보세요."
    },
    {
        "id": "dream_056",
        "title": "깊은 산속에서 산삼을 발견하는 꿈",
        "type": "good",
        "summary": "인생 역전의 꿈입니다. 도저히 해결 불가능해 보였던 일에 서광이 비치며 엄청난 이득을 취하게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "포기하지 마세요. 가장 깊은 어둠 끝에 가장 밝은 빛이 있습니다."
    },
    {
        "id": "dream_057",
        "title": "홍수가 나서 온 마을이 물바다가 되는 꿈",
        "type": "bad",
        "summary": "감당하기 힘든 감정의 소용돌이에 휘말리거나, 국가적·사회적인 재난 혹은 큰 손실에 노출될 수 있는 위험한 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "흥분을 가라앉히고 이성적으로 판단하기 위해 노력하세요."
    },
    {
        "id": "dream_058",
        "title": "빨간 고추가 바구니에 가득 담겨 있는 꿈",
        "type": "baby",
        "summary": "활동적이고 정열적인 아들을 얻게 될 전형적인 태몽입니다. 강한 추진력을 바탕으로 자수성가할 관상입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "열정을 불태울 수 있는 새로운 취미를 찾아보는 것도 좋습니다."
    },
    {
        "id": "dream_059",
        "title": "하늘이 무너져 나를 덮치는 꿈",
        "type": "bad",
        "summary": "가장 믿었던 존재에게 버림받거나 삶의 근간이 흔들리는 큰 충격을 받을 수 있음을 경고합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "멘탈 관리에 각별히 유의하고 주변에 도움을 줄 수 있는 지지층을 확보하세요."
    },
    {
        "id": "dream_060",
        "title": "거울 속에 비친 내 모습이 너무나 아름답게 보이는 꿈",
        "type": "good",
        "summary": "자존감이 상승하고 자신의 가치를 재발견하게 되는 계기가 생깁니다. 연인이 생기거나 대중의 사랑을 받게 될 예쁜 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "오늘 하루는 당신 위주로 세상을 살아보세요. 당신은 충분히 아름답습니다."
    },
    {
        "id": "dream_061",
        "title": "바다 밑바닥까지 환히 내려다보이는 꿈",
        "type": "good",
        "summary": "진실이 밝혀지고 복잡했던 문제들이 명쾌하게 정리됩니다. 통찰력이 날카로워져 사업적 판단에 큰 도움이 될 시기입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "결정이 필요한 일이 있다면 믿음을 가지고 밀어붙이세요."
    },
    {
        "id": "dream_062",
        "title": "머리가 뱀으로 변하는 꿈",
        "type": "bad",
        "summary": "독한 마음을 먹게 되거나 타인에게 상처를 줄 수 있는 상황에 놓입니다. 주변 사람들로부터 미움을 살 수 있으니 주의하세요.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "언사를 순화하고 매사에 부드러운 태도를 유지하십시오."
    },
    {
        "id": "dream_063",
        "title": "잘 익은 노란 복숭아를 먹는 꿈",
        "type": "baby",
        "summary": "사랑스럽고 애교 넘치는 아이를 얻을 태몽입니다. 인기가 많고 대인관계가 원만한 행운아로 자랄 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "달콤한 과일을 먹으며 기분 전환을 해보세요. 행운의 지수가 올라갑니다."
    },
    {
        "id": "dream_064",
        "title": "비행기를 타고 구름 위를 날아가는 꿈",
        "type": "good",
        "summary": "사회적 지위가 급격히 상승하거나 평소 꿈꿔왔던 해외 진출 등의 기회가 찾아옵니다. 높은 이상이 실현되는 소중한 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "더 높은 곳을 바라보세요. 당신의 꿈은 실현 가능한 현실이 되고 있습니다."
    },
    {
        "id": "dream_065",
        "title": "진흙탕에 빠져 허우적거리는 꿈",
        "type": "bad",
        "summary": "모함에 빠지거나 벗어나려 할수록 더 깊게 빠져드는 곤란한 처지에 놓입니다. 건강 악화나 금전적 압박을 조심해야 합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "서두르지 마세요. 도움의 손길을 기다리며 차분히 에너지를 모으는 것이 우선입니다."
    },
    {
        "id": "dream_066",
        "title": "길가에서 동전을 자꾸 줍는 꿈",
        "type": "bad",
        "summary": "사소한 일로 인해 근심거리가 쌓이거나 잔병치레를 할 수 있음을 의미합니다. 큰 재물보다는 소소한 걱정거리를 상징할 때가 많습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "작은 일에 너무 연연하지 마세요. 멀리 내다보는 시야가 필요합니다."
    },
    {
        "id": "dream_067",
        "title": "집안에 향기가 진동하는 꿈",
        "type": "good",
        "summary": "명예가 드높아지고 가문에 영광스러운 일이 생깁니다. 당신의 행적이 많은 이들에게 귀감이 될 고상한 길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "아름다운 행동이 아름다운 결과를 낳습니다. 주변을 따뜻하게 대하세요."
    },
    {
        "id": "dream_068",
        "title": "낯선 사람이 내 방에 들어와 노려보는 꿈",
        "type": "bad",
        "summary": "불청객의 방문이나 누군가의 간섭으로 인해 정신적 자유를 침해받게 됩니다. 사생활 침해나 도난 사고를 조심하세요.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "보안을 강화하고 개인 정보를 함부로 공유하지 마세요."
    },
    {
        "id": "dream_069",
        "title": "황금이 쏟아지는 폭포수를 맞으며 서 있는 꿈",
        "type": "good",
        "summary": "천재적인 기회를 만나 벼락부자가 되거나, 일생일대의 명예를 한꺼번에 얻게 될 강렬한 운세입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "다가오는 기회를 망설이지 말고 온몸으로 받아들이세요."
    },
    {
        "id": "dream_070",
        "title": "내 몸이 점점 투명해져 사라지는 꿈",
        "type": "bad",
        "summary": "존재감이 없어지거나 경제적으로 타격을 입어 삶의 기반을 잃어갈 수 있음을 시사합니다. 무력감과 우울증을 조심하십시오.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "작은 것부터 성취하며 자존감을 회복하는 훈련이 필요합니다."
    },
    {
        "id": "dream_071",
        "title": "숲속에서 거대한 코끼리를 만나는 꿈",
        "type": "good",
        "summary": "든든한 배경이나 권력을 가진 단체의 도움을 받아 일을 성사시킵니다. 인내심을 가지고 추진하면 반드시 성공합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "묵직한 끈기가 당신의 무기입니다. 흔들리지 말고 당신의 속도대로 가세요."
    },
    {
        "id": "dream_072",
        "title": "깜깜한 동굴 안에서 불빛을 찾는 꿈",
        "type": "good",
        "summary": "절망적인 상황 속에서도 한 줄기 희망을 찾아내 결국 성공의 길로 나서게 됨을 의미합니다. 위기 극복의 상징입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "절대 포기하지 마세요. 빛은 아주 가까운 곳에 있습니다."
    },
    {
        "id": "dream_073",
        "title": "옷을 갈아입으려는데 입을 옷이 없는 꿈",
        "type": "bad",
        "summary": "자신의 입장이나 지위가 불안정해지고 의지할 곳이 없어 외로움을 느끼게 됩니다. 현실에서의 자립심이 시험받는 시기입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "내실을 강화하여 스스로를 지킬 수 있는 힘을 기르세요."
    },
    {
        "id": "dream_074",
        "title": "바다 밑에서 진주 조개를 건져 올리는 꿈",
        "type": "good",
        "summary": "숨겨진 재능이 발견되거나 아주 소중한 보물을 얻게 될 징조입니다. 귀한 자식을 얻게 될 태몽으로도 아주 좋습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "깊이 생각하고 연구하던 일에서 정답을 찾게 될 것입니다. 집중하세요."
    },
    {
        "id": "dream_075",
        "title": "시뻘건 화염이 산을 집어삼키는 광경을 보는 꿈",
        "type": "good",
        "summary": "국가적 수준의 큰 변화가 당신에게 유리하게 작용하거나, 대규모 사업이 크게 성공하여 세상을 놀라게 할 대길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "거시적인 관점으로 투자하고 움직이세요. 운의 스케일이 매우 큽니다."
    },
    {
        "id": "dream_076",
        "title": "내가 왕이 되어 옥좌에 앉아 있는 꿈",
        "type": "good",
        "summary": "그동안 갈고닦은 실력을 만방에 떨칠 기회가 옵니다. 사람들을 지휘하고 영향력을 행사할 수 있는 최고의 위치에 오를 것입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "책무를 다하는 리더의 자세를 갖추세요. 준비가 된 만큼 보답 받을 것입니다."
    },
    {
        "id": "dream_077",
        "title": "거리를 걷다가 싱크홀에 빠지는 꿈",
        "type": "bad",
        "summary": "탄탄대로라 믿었던 일에 함정이 숨어 있습니다. 갑작스러운 금전 사고나 신용 실추에 극히 주의해야 할 위험한 신호입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "돌다리도 두드려보고 건너는 심정으로 매사 꼼꼼히 체크하세요."
    },
    {
        "id": "dream_078",
        "title": "은하수가 집안으로 흘러 들어오는 꿈",
        "type": "good",
        "summary": "우주의 기운이 당신을 돕고 있습니다. 상상도 못 했던 방식으로 꿈이 실현되며 신비로운 체험이나 큰 행운이 따릅니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "명상을 통해 내면의 목소리에 귀를 기울여보세요. 직관력이 답을 줄 것입니다."
    },
    {
        "id": "dream_079",
        "title": "나의 그림자가 괴물로 변하는 꿈",
        "type": "bad",
        "summary": "마음속의 어두운 욕망이 당신을 지배하려 할 때 꾸는 꿈입니다. 자아 갈등이나 심리적 죄책감으로 괴로워할 수 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "정직한 마음으로 스스로를 대하세요. 어둠을 밝힐 용기가 필요합니다."
    },
    {
        "id": "dream_080",
        "title": "눈앞의 벽이 스르르 문으로 변하며 열리는 꿈",
        "type": "good",
        "summary": "막다른 골목이라 생각했던 곳에서 새로운 통로를 발견합니다. 창의적인 해결책이 떠오르고 인생의 새로운 장이 열릴 서막입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "고정관념을 버리세요. 세상은 당신이 생각하는 것보다 훨씬 유연합니다."
    },
    {
        "id": "dream_081",
        "title": "흰 사슴이 나를 빤히 쳐다보는 꿈",
        "type": "good",
        "summary": "성스러운 존재의 가호가 있습니다. 마음이 정화되고 고결한 정신적 고양을 경험하게 됩니다. 순탄한 앞날이 기다리고 있습니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자연을 가까이하고 순수한 의도를 유지하십시오. 행운이 머물 것입니다."
    },
    {
        "id": "dream_082",
        "title": "식탁 위의 음식이 순식간에 썩어버리는 꿈",
        "type": "bad",
        "summary": "거의 다 잡은 기회를 놓치거나 수입이 될 뻔한 돈이 허공으로 날아가 버릴 수 있는 허망한 징조입니다. 부패한 거래를 조심하세요.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "공짜를 바라지 말고 투명하고 정당한 방법으로 이익을 취하세요."
    },
    {
        "id": "dream_083",
        "title": "황금 열쇠를 손에 쥐는 꿈",
        "type": "good",
        "summary": "문제 해결의 결정적인 단서를 얻게 됩니다. 재물과 권력을 동시에 손에 넣을 수 있는 확실한 자격이 주어지는 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "지금 가진 권한을 지혜롭게 휘두르세요. 성공의 문은 당신 손에 달려 있습니다."
    },
    {
        "id": "dream_084",
        "title": "비 내리는 밤길을 혼자 외롭게 걷는 꿈",
        "type": "bad",
        "summary": "고난과 시련의 시기입니다. 당신을 도와주는 이 하나 없이 홀로 짐을 짊어져야 할 수 있습니다. 차근차근 헤쳐 나갈 인내가 필요합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "내면을 단단하게 다지는 수련의 기간으로 삼으세요. 비 온 뒤 땅은 굳습니다."
    },
    {
        "id": "dream_085",
        "title": "커다란 보름달이 내 방을 훤히 비추는 꿈",
        "type": "good",
        "summary": "고민하던 문제가 명쾌하게 해결되고 가정에 평화와 풍요가 가득해집니다. 마음의 평온이 찾아오는 아주 평안한 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "감사의 마음을 표현하세요. 평온한 일상이 가장 큰 축복입니다."
    },
    {
        "id": "dream_086",
        "title": "입안에 가시가 돋는 꿈",
        "type": "bad",
        "summary": "말실수로 인해 큰 화를 입거나 하는 일마다 장애물이 생겨 답답함을 느끼게 됩니다. 주변 사람들과의 소통에 큰 누수가 생깁니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "침묵이 금입니다. 불필요한 말은 줄이고 귀를 기울이세요."
    },
    {
        "id": "dream_087",
        "title": "거대한 산이 통째로 금으로 변해 반짝이는 꿈",
        "type": "good",
        "summary": "평생을 써도 모자랄 막대한 부를 쌓게 될 상상 이상의 대길몽입니다. 가문을 일으켜 세울 거대한 상징입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "큰 그릇을 준비하세요. 쏟아지는 복을 담아낼 그릇이 필요합니다."
    },
    {
        "id": "dream_088",
        "title": "나의 이름이 온 하늘에 금색 글씨로 새겨지는 꿈",
        "type": "good",
        "summary": "명예와 인기가 전 세계를 휩쓸 만큼 대단한 결실을 봅니다. 역사에 기록될 만한 훌륭한 업적을 남기게 될 징조입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자부심을 가지고 공익을 위해 행동하세요. 당신의 이름이 빛나고 있습니다."
    },
    {
        "id": "dream_089",
        "title": "검은 상여가 줄을 지어 나가는 꿈",
        "type": "bad",
        "summary": "실제로 이별을 겪거나, 오랫동안 정들었던 곳을 떠나야 하는 슬픈 변화를 의미합니다. 심리적인 상실감에 대비하십시오.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "과거를 보내주고 새로운 미래를 맞이할 마음의 준비를 하세요."
    },
    {
        "id": "dream_090",
        "title": "푸른 대나무가 쑥쑥 자라 하늘에 닿는 꿈",
        "type": "good",
        "summary": "올곧은 신념으로 성공을 거두며 자손들이 번창할 아주 길한 꿈입니다. 어려운 위기 속에서도 꺾이지 않는 절개를 상징합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "초심을 잃지 마세요. 당신의 정의로움이 결국 승리할 것입니다."
    },
    {
        "id": "dream_091",
        "title": "바람이 불어 집안의 먼지를 말끔히 쓸어가는 꿈",
        "type": "good",
        "summary": "지저분했던 문제가 해결되고 악귀나 액운이 물러갑니다. 속이 시원해지는 소식과 함께 산뜻한 새 기운이 집안을 채웁니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "대청소를 하거나 주변 환경을 정리해보세요. 새 기운이 더 빨리 정착합니다."
    },
    {
        "id": "dream_092",
        "title": "내가 새가 되어 좁은 새장 속에 갇혀 우는 꿈",
        "type": "bad",
        "summary": "자유를 억압받고 재능을 펼치지 못하는 답답한 현실을 반영합니다. 누군가의 통제 아래 있어 스트레스가 극심한 상태입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "탈출구를 찾으세요. 당신은 날개를 가졌음을 잊지 말아야 합니다."
    },
    {
        "id": "dream_093",
        "title": "황금 나비가 내 주변을 춤추며 도는 꿈",
        "type": "good",
        "summary": "기분 좋은 변화와 기쁜 소식이 연달아 찾아옵니다. 창의력이 최고조에 달하며 예술가에게는 최고의 영감을 줍니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "아름다움에 집중하세요. 당신의 삶이 한 편의 예술작품이 되고 있습니다."
    },
    {
        "id": "dream_094",
        "title": "나의 목소리가 나오지 않아 소리를 지르지 못하는 꿈",
        "type": "bad",
        "summary": "사회적 발언권을 잃거나 누군가에게 비판을 받아도 해명할 길이 없어 억울함을 겪게 됩니다. 고립된 심리 상태를 뜻합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "글로 기록하거나 다른 소통 방식을 찾아보세요. 진실은 결국 밝혀집니다."
    },
    {
        "id": "dream_095",
        "title": "커다란 거북이가 바다로 나를 인도하는 꿈",
        "type": "good",
        "summary": "장수와 번영의 상징입니다. 노련한 인도자를 만나 탄탄대로의 미래를 설계하게 되며 안락한 노후가 보장되는 길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "천천히 가더라도 바른 방향으로 가세요. 거북이처럼 꾸준함이 승리합니다."
    },
    {
        "id": "dream_096",
        "title": "온 세상이 피로 가득 잠기는 꿈",
        "type": "good",
        "summary": "꿈에서의 피는 재산을 의미하므로, 세상을 덮을 정도의 막대한 부가 당신의 영향력 아래 놓이게 될 엄청난 길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "두려워하지 마세요. 거대한 자본의 흐름이 당신에게 몰려오고 있습니다."
    },
    {
        "id": "dream_097",
        "title": "하늘에서 천사들의 나팔 소리가 울려 퍼지는 꿈",
        "type": "good",
        "summary": "모든 고통이 끝나고 하늘의 축복이 내리는 최고의 상서로운 꿈입니다. 명예 회복과 함께 최고의 영광을 누리게 됩니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "겸허히 축복을 받으세요. 당신은 그럴 자격이 충분합니다."
    },
    {
        "id": "dream_098",
        "title": "나의 심장이 멎는 듯한 고통을 느끼는 꿈",
        "type": "bad",
        "summary": "실제로 건강에 이상 신호가 왔거나, 사랑하는 사람과의 이별로 인해 극심한 상실감을 느낄 때 나타납니다. 휴식이 절대적으로 필요합니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신의 몸을 돌보는 데 모든 에너지를 쏟으세요. 지금은 쉼이 보약입니다."
    },
    {
        "id": "dream_099",
        "title": "우주선을 타고 끝없는 우주를 탐험하는 꿈",
        "type": "good",
        "summary": "미지의 영역에 도전하여 성공을 거둡니다. 상상력을 현실로 바꾸는 발명가나 선구자의 길을 걷게 될 아주 멋진 꿈입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "불가능에 도전하세요. 당신의 한계는 당신이 정하는 것보다 훨씬 멀리 있습니다."
    },
    {
        "id": "dream_100",
        "title": "내가 아주 넓은 평원을 묵묵히 혼자 지키고 서 있는 꿈",
        "type": "good",
        "summary": "고독하지만 강력한 주권과 독립을 상징합니다. 누구의 도움 없이 스스로 일가견을 이루어 큰 업적을 쌓게 될 위엄 있는 길몽입니다.",
        "lucky_numbers": generate_lucky_numbers(),
        "action_tip": "자신을 믿으세요. 당신은 당신 인생의 주인이자 가장 강력한 수호자입니다."
    }
]

with open('dreams.json', 'w', encoding='utf-8') as f:
    json.dump(dreams, f, ensure_ascii=False, indent=2)

print(f"Successfully generated {len(dreams)} dream entries in dreams.json")
