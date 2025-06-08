let chart;

const stopwords = [
    "the", "and", "to", "in", "of", "a", "for", "with", "on", "this", "that", "it", "its",
    "from", "by" 
];

function getChartData(text) {
    const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];

    const frequency = {};

    words.forEach(word => {
        if (!stopwords.includes(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    // 상위 30개 단어만 정렬하여 추출
    const sorted = Object.entries(frequency)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 30);

    const freq_sorted = Object.fromEntries(sorted);

    return {
        labels: Object.keys(freq_sorted),
        datasets: [
            {
                label: "Frequency",
                data: Object.values(freq_sorted),
            }
        ]
    };
}

function updateChart() {
    const text = document.getElementById("textInput").value;
    const data = getChartData(text);

    if (chart) {
        chart.data.labels = data.labels;
        chart.data.datasets[0].data = data.datasets[0].data;
        chart.update();
    } else {
        const ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
