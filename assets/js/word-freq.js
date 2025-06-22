let text = "";

// 불용어 목록
const stopwords = [
    "the", "and", "to", "in", "of", "a", "for", "with",
    "on", "this", "that", "it", "which", "an", "from",
    "they", "by", "its", "is", "as"
];

const ctx = document.getElementById('myChart').getContext('2d');

const chart = new Chart(ctx, {
    "type": "bar",
    "data": {},
    "options": {
        "responsive": true
    }
})

function updateChart() {
    text = document.getElementById("textInput").value;
    chart.data = getChartData(text);
    chart.update();
}

function getChartData(text, topn=30) {
    // 단어 배열 만들기
    const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];
    
    // 카운터 객체 만들기 {단어: 빈도}
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    })
    
    // 불용어 제거
    for (stop of stopwords) {
        frequency[stop] = 0;
    }

    // 빈도 내림차순으로 정렬하기
    const sorted = Object.entries(frequency).sort(([,a],[,b]) => b - a);
    // 상위 30개만 저장하기
    const freq_sorted = Object.fromEntries(sorted.slice(0, topn));

    // 차트용 데이터 만들기
    const chartData = {
        "labels": Object.keys(freq_sorted),
        "datasets": [
            {
                "label": "Frequency",
                "data": Object.values(freq_sorted)
            }
        ]
    };

    return chartData;
}