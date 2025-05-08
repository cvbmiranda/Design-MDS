document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const metricValues = document.querySelectorAll('.metric-value');

  // Sample data for different time periods
  const metricsData = {
    week: {
      commits: 25,
      issues: 3,
      pullRequests: 2,
      closedPRs: 1,
      resolvedPRs: 1,
      merges: 2,
      points: 180,
      activityData: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        commits: [5, 3, 7, 2, 4, 1, 3],
        issues: [1, 0, 1, 0, 1, 0, 0],
        prs: [1, 0, 0, 1, 0, 0, 0]
      },
      distributionData: {
        commits: 25,
        issues: 3,
        pullRequests: 8,
        reviews: 5
      },
      teamData: {
        labels: ['Equipe A', 'Equipe B', 'Equipe C'],
        commits: [10, 8, 7],
        issues: [2, 1, 0],
        prs: [3, 2, 3]
      }
    },
    month: {
      commits: 120,
      issues: 15,
      pullRequests: 8,
      closedPRs: 5,
      resolvedPRs: 4,
      merges: 11,
      points: 850,
      activityData: {
        labels: Array.from({length: 30}, (_, i) => i + 1),
        commits: Array.from({length: 30}, () => Math.floor(Math.random() * 8) + 1),
        issues: Array.from({length: 30}, () => Math.floor(Math.random() * 3)),
        prs: Array.from({length: 30}, () => Math.floor(Math.random() * 2))
      },
      distributionData: {
        commits: 120,
        issues: 15,
        pullRequests: 8,
        reviews: 12
      },
      teamData: {
        labels: ['Equipe A', 'Equipe B', 'Equipe C'],
        commits: [45, 38, 37],
        issues: [6, 5, 4],
        prs: [12, 10, 8]
      }
    },
    year: {
      commits: 450,
      issues: 65,
      pullRequests: 35,
      closedPRs: 28,
      resolvedPRs: 25,
      merges: 42,
      points: 3200,
      activityData: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        commits: [35, 42, 38, 45, 40, 35, 30, 38, 42, 45, 40, 35],
        issues: [5, 6, 4, 7, 5, 4, 3, 6, 7, 8, 6, 4],
        prs: [3, 4, 2, 5, 3, 2, 1, 4, 5, 6, 4, 2]
      },
      distributionData: {
        commits: 450,
        issues: 65,
        pullRequests: 35,
        reviews: 45
      },
      teamData: {
        labels: ['Equipe A', 'Equipe B', 'Equipe C'],
        commits: [150, 145, 155],
        issues: [25, 20, 20],
        prs: [35, 30, 25]
      }
    }
  };

  // Chart instances
  let activityChart, distributionChart, teamChart;

  // Function to initialize charts
  function initializeCharts() {
    // Activity Chart
    const activityCtx = document.getElementById('activityChart').getContext('2d');
    activityChart = new Chart(activityCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Commits',
            data: [],
            backgroundColor: 'rgba(95, 41, 244, 0.6)',
            borderColor: 'rgba(95, 41, 244, 1)',
            borderWidth: 1
          },
          {
            label: 'Issues',
            data: [],
            backgroundColor: 'rgba(4, 111, 248, 0.6)',
            borderColor: 'rgba(4, 111, 248, 1)',
            borderWidth: 1
          },
          {
            label: 'Pull Requests',
            data: [],
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#FFFFFF'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#FFFFFF'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#FFFFFF'
            }
          }
        }
      }
    });

    // Distribution Chart
    const distributionCtx = document.getElementById('distributionChart').getContext('2d');
    distributionChart = new Chart(distributionCtx, {
      type: 'doughnut',
      data: {
        labels: ['Commits', 'Issues', 'Pull Requests', 'Reviews'],
        datasets: [{
          data: [],
          backgroundColor: [
            'rgba(95, 41, 244, 0.6)',
            'rgba(4, 111, 248, 0.6)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.3)'
          ],
          borderColor: [
            'rgba(95, 41, 244, 1)',
            'rgba(4, 111, 248, 1)',
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 0.5)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              color: '#FFFFFF'
            }
          }
        }
      }
    });

    // Team Chart
    const teamCtx = document.getElementById('teamChart').getContext('2d');
    teamChart = new Chart(teamCtx, {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Commits',
            data: [],
            backgroundColor: 'rgba(95, 41, 244, 0.6)',
            borderColor: 'rgba(95, 41, 244, 1)',
            borderWidth: 1
          },
          {
            label: 'Issues',
            data: [],
            backgroundColor: 'rgba(4, 111, 248, 0.6)',
            borderColor: 'rgba(4, 111, 248, 1)',
            borderWidth: 1
          },
          {
            label: 'Pull Requests',
            data: [],
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#FFFFFF'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#FFFFFF'
            }
          },
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: '#FFFFFF'
            }
          }
        }
      }
    });
  }

  // Function to update charts
  function updateCharts(timeframe) {
    const data = metricsData[timeframe];

    // Update Activity Chart
    activityChart.data.labels = data.activityData.labels;
    activityChart.data.datasets[0].data = data.activityData.commits;
    activityChart.data.datasets[1].data = data.activityData.issues;
    activityChart.data.datasets[2].data = data.activityData.prs;
    activityChart.update();

    // Update Distribution Chart
    distributionChart.data.datasets[0].data = [
      data.distributionData.commits,
      data.distributionData.issues,
      data.distributionData.pullRequests,
      data.distributionData.reviews
    ];
    distributionChart.update();

    // Update Team Chart
    teamChart.data.labels = data.teamData.labels;
    teamChart.data.datasets[0].data = data.teamData.commits;
    teamChart.data.datasets[1].data = data.teamData.issues;
    teamChart.data.datasets[2].data = data.teamData.prs;
    teamChart.update();
  }

  // Function to animate number counting
  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const animate = () => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        element.textContent = end;
      } else {
        element.textContent = Math.round(current);
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }

  // Function to update metrics display with animation
  function updateMetrics(timeframe) {
    const data = metricsData[timeframe];
    
    // Update each metric with animation
    document.querySelectorAll('[data-metric]').forEach(element => {
      const metric = element.getAttribute('data-metric');
      const valueElement = element.querySelector('.metric-value');
      
      if (valueElement && data[metric] !== undefined) {
        const currentValue = parseInt(valueElement.textContent) || 0;
        const newValue = data[metric];
        
        // Add fade out effect
        valueElement.style.opacity = '0';
        
        setTimeout(() => {
          // Animate the number counting
          animateValue(valueElement, currentValue, newValue, 500);
          // Add fade in effect
          valueElement.style.opacity = '1';
        }, 150);
      }
    });

    // Update total points with animation
    const pointsElement = document.querySelector('.summary h4 .metric-value');
    if (pointsElement) {
      const currentPoints = parseInt(pointsElement.textContent) || 0;
      const newPoints = data.points;
      
      pointsElement.style.opacity = '0';
      setTimeout(() => {
        animateValue(pointsElement, currentPoints, newPoints, 500);
        pointsElement.style.opacity = '1';
      }, 150);
    }

    // Update charts
    updateCharts(timeframe);
  }

  // Achievement data
  const achievements = {
    'Primeiro PR': {
      icon: 'fa-code-branch',
      description: 'Envie seu primeiro Pull Request',
      unlocked: true
    },
    '100 Commits': {
      icon: 'fa-code',
      description: 'Faça 100 commits no total',
      unlocked: true
    },
    'Líder de Equipe': {
      icon: 'fa-users',
      description: 'Seja líder de uma equipe por 1 mês',
      unlocked: false
    },
    'Caçador de Bugs': {
      icon: 'fa-bug',
      description: 'Resolva 50 issues',
      unlocked: true
    },
    'Estrela do Mês': {
      icon: 'fa-star',
      description: 'Seja o contribuidor mais ativo do mês',
      unlocked: false
    },
    'Contribuidor VIP': {
      icon: 'fa-rocket',
      description: 'Alcance 1000 pontos de experiência',
      unlocked: false
    }
  };

  // Avatar customization data
  const avatars = {
    'avatar1': {
      src: 'imagens/avatar.png',
      unlocked: true,
      requiredLevel: 1
    },
    'avatar2': {
      src: 'imagens/avatar2.png',
      unlocked: false,
      requiredLevel: 15
    },
    'avatar3': {
      src: 'imagens/avatar3.png',
      unlocked: false,
      requiredLevel: 30
    }
  };

  // Function to show achievement tooltip
  function showAchievementTooltip(element, achievement) {
    const tooltip = document.createElement('div');
    tooltip.className = 'achievement-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        <i class="fas ${achievement.icon}"></i>
        <h4>${element.querySelector('span').textContent}</h4>
        <p>${achievement.description}</p>
        ${!achievement.unlocked ? '<span class="locked-text">Bloqueado</span>' : ''}
      </div>
    `;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;

    element.addEventListener('mouseleave', () => {
      tooltip.remove();
    });
  }

  // Function to show avatar tooltip
  function showAvatarTooltip(element, avatar) {
    const tooltip = document.createElement('div');
    tooltip.className = 'avatar-tooltip';
    tooltip.innerHTML = `
      <div class="tooltip-content">
        ${!avatar.unlocked ? `
          <i class="fas fa-lock"></i>
          <p>Desbloqueie no nível ${avatar.requiredLevel}</p>
        ` : `
          <p>Clique para selecionar</p>
        `}
      </div>
    `;
    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + 10}px`;
    tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;

    element.addEventListener('mouseleave', () => {
      tooltip.remove();
    });
  }

  // Add achievement tooltips
  document.querySelectorAll('.achievement').forEach(achievement => {
    const achievementName = achievement.querySelector('span').textContent;
    const achievementData = achievements[achievementName];

    achievement.addEventListener('mouseenter', () => {
      showAchievementTooltip(achievement, achievementData);
    });
  });

  // Add avatar customization tooltips and click handlers
  document.querySelectorAll('.option').forEach(option => {
    const avatarId = option.querySelector('img').alt.toLowerCase().replace(' ', '');
    const avatarData = avatars[avatarId];

    option.addEventListener('mouseenter', () => {
      showAvatarTooltip(option, avatarData);
    });

    if (avatarData.unlocked) {
      option.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.option').forEach(opt => {
          opt.classList.remove('active');
        });
        // Add active class to clicked option
        option.classList.add('active');
        // Update main avatar
        document.querySelector('.avatar').src = avatarData.src;
      });
    }
  });

  // Add CSS for tooltips
  const style = document.createElement('style');
  style.textContent = `
    .achievement-tooltip, .avatar-tooltip {
      position: fixed;
      z-index: 1000;
      pointer-events: none;
    }

    .tooltip-content {
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1rem;
      color: var(--text-primary);
      font-size: 0.9rem;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      min-width: 200px;
    }

    .tooltip-content i {
      font-size: 1.5rem;
      color: var(--primary-color);
      margin-bottom: 0.5rem;
    }

    .tooltip-content h4 {
      margin: 0.5rem 0;
      color: var(--text-primary);
    }

    .tooltip-content p {
      margin: 0.5rem 0;
      color: var(--text-secondary);
    }

    .locked-text {
      color: #ff4444;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      display: block;
    }
  `;
  document.head.appendChild(style);

  // Initialize charts
  initializeCharts();

  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'translateY(0)';
      });
      
      // Add active class to clicked button
      button.classList.add('active');
      button.style.transform = 'translateY(-2px)';
      
      // Get the timeframe from the data attribute
      const timeframe = button.getAttribute('data-timeframe');
      
      // Update metrics based on selected timeframe
      updateMetrics(timeframe);
    });
  });

  // Initialize with month view
  updateMetrics('month');

  // Streak and Performance Summary functionality
  const streakData = {
    currentStreak: 7,
    longestStreak: 14,
    lastActivity: new Date(),
    activityHistory: [
      { date: '2024-03-01', active: true },
      { date: '2024-03-02', active: true },
      { date: '2024-03-03', active: true },
      { date: '2024-03-04', active: true },
      { date: '2024-03-05', active: true },
      { date: '2024-03-06', active: true },
      { date: '2024-03-07', active: true },
    ]
  };

  const performanceData = {
    weekly: {
      commits: 25,
      pullRequests: 3,
      points: 150,
      goal: 200,
      progress: 75
    },
    monthly: {
      commits: 98,
      pullRequests: 12,
      points: 580,
      goal: 800,
      progress: 72
    },
    yearly: {
      commits: 450,
      pullRequests: 45,
      points: 2500,
      goal: 3000,
      progress: 83
    }
  };

  function initializeStreakCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const today = new Date();
    
    // Clear existing calendar
    calendarGrid.innerHTML = '';
    
    // Add last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayElement = document.createElement('div');
      dayElement.className = 'calendar-day';
      
      // Check if this day was active
      const isActive = streakData.activityHistory.some(activity => 
        activity.date === date.toISOString().split('T')[0]
      );
      
      if (isActive) {
        dayElement.classList.add('active');
      }
      
      if (i === 0) {
        dayElement.classList.add('today');
      }
      
      dayElement.textContent = date.getDate();
      calendarGrid.appendChild(dayElement);
    }
  }

  function updatePerformanceSummary(timeframe = 'weekly') {
    const data = performanceData[timeframe];
    
    // Update stats
    document.querySelector('.stat-item:nth-child(1) .stat-value').textContent = `+${data.commits}`;
    document.querySelector('.stat-item:nth-child(2) .stat-value').textContent = `+${data.pullRequests}`;
    document.querySelector('.stat-item:nth-child(3) .stat-value').textContent = `+${data.points}`;
    
    // Update progress
    const progressBar = document.querySelector('.summary-progress .progress');
    const progressLabel = document.querySelector('.progress-label span:last-child');
    
    progressBar.style.width = `${data.progress}%`;
    progressLabel.textContent = `${data.progress}%`;
    
    // Add animation
    progressBar.style.transition = 'width 0.5s ease-in-out';
  }

  function checkAndUpdateStreak() {
    const today = new Date();
    const lastActivity = new Date(streakData.lastActivity);
    
    // Check if user has been active today
    if (today.toDateString() !== lastActivity.toDateString()) {
      // Check if streak is broken (more than 1 day since last activity)
      const daysSinceLastActivity = Math.floor((today - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLastActivity > 1) {
        streakData.currentStreak = 0;
      }
    }
    
    // Update streak display
    document.querySelector('.streak-count').textContent = streakData.currentStreak;
    
    // Update calendar
    initializeStreakCalendar();
  }

  // Initialize streak and performance summary
  document.addEventListener('DOMContentLoaded', () => {
    initializeStreakCalendar();
    updatePerformanceSummary();
    
    // Check streak daily
    setInterval(checkAndUpdateStreak, 1000 * 60 * 60); // Check every hour
    
    // Add event listeners for timeframe buttons
    document.querySelectorAll('.filter-box button').forEach(button => {
      button.addEventListener('click', () => {
        const timeframe = button.getAttribute('data-timeframe');
        updatePerformanceSummary(timeframe);
      });
    });
  });
}); 