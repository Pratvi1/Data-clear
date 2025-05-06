let loggedIn = false;
const fakeUsers = [];

function checkLogin() {
  showSection("login");
  updateNavigation();
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Check if password is not empty
  if (password.length === 0) {
    alert("Please enter your password.");
    return false;
  }

  document.getElementById("user-info").innerText = `Logged in as: ${email}`;
  document.getElementById("currentEmail").value = email;
  loggedIn = true;
  updateNavigation();
  showSection("dashboard");
  return false;
}

function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  
  // Check for valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false;
  }

  // Check if password is not empty
  if (password.length === 0) {
    alert("Please enter your password.");
    return false;
  }

  document.getElementById("user-info").innerText = `Logged in as: ${email}`;
  loggedIn = true;
  updateNavigation();
  showSection("dashboard");
  return false;
}

function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function updateNavigation() {
  const loginLink = document.getElementById("link-login");
  const signupLink = document.getElementById("link-signup");
  const dashboardLink = document.querySelector('a[onclick="showSection(\'dashboard\')"]');
  const companiesLink = document.querySelector('a[onclick="showSection(\'companies\')"]');
  const accountLink = document.querySelector('a[onclick="showSection(\'account\')"]');

  if (loggedIn) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    dashboardLink.style.display = "inline";
    companiesLink.style.display = "inline";
    accountLink.style.display = "inline";
  } else {
    loginLink.style.display = "inline";
    signupLink.style.display = "inline";
    dashboardLink.style.display = "none";
    companiesLink.style.display = "none";
    accountLink.style.display = "none";
  }
}

function requestDeletion(serviceName) {
  if (!loggedIn) {
    alert("You must be logged in to request data deletion.");
    showSection("login");
    return;
  }
  alert(`Your data deletion request has been sent to ${serviceName}.`);
}

function initializeCharts() {
  // Data Usage Chart
  const dataUsageCtx = document.getElementById('dataUsageChart').getContext('2d');
  new Chart(dataUsageCtx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Data Points',
        data: [1200, 1500, 1800, 2200, 2500, 2800, 3000, 3200, 3500, 3800, 4000, 4200],
        borderColor: '#58a6ff',
        backgroundColor: 'rgba(88, 166, 255, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 10,
          right: 20,
          bottom: 10,
          left: 20
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#888',
            padding: 10,
            font: {
              size: 11
            }
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#888',
            padding: 10,
            font: {
              size: 11
            }
          }
        }
      }
    }
  });

  // Company Data Distribution Chart
  const companyDataCtx = document.getElementById('companyDataChart').getContext('2d');
  new Chart(companyDataCtx, {
    type: 'doughnut',
    data: {
      labels: ['Fakebook', 'Goggle', 'Shopazon'],
      datasets: [{
        data: [30, 20, 50],
        backgroundColor: ['#58a6ff', '#238636', '#f78166']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: 10
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#888',
            padding: 10,
            font: {
              size: 11
            }
          }
        }
      }
    }
  });

  // Company-specific charts
  initializeCompanyCharts();
}

function initializeCompanyCharts() {
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 20
    },
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#888'
        }
      }
    }
  };

  // Fakebook Chart
  const fakebookCtx = document.getElementById('fakebookChart').getContext('2d');
  new Chart(fakebookCtx, {
    type: 'bar',
    data: {
      labels: ['Photos', 'Location', 'Friends', 'Posts'],
      datasets: [{
        label: 'Data Points',
        data: [500, 300, 200, 234],
        backgroundColor: '#58a6ff'
      }]
    },
    options: commonOptions
  });

  // Goggle Chart
  const goggleCtx = document.getElementById('goggleChart').getContext('2d');
  new Chart(goggleCtx, {
    type: 'bar',
    data: {
      labels: ['Searches', 'Location', 'Ads', 'History'],
      datasets: [{
        label: 'Data Points',
        data: [300, 200, 200, 156],
        backgroundColor: '#238636'
      }]
    },
    options: commonOptions
  });

  // Shopazon Chart
  const shopazonCtx = document.getElementById('shopazonChart').getContext('2d');
  new Chart(shopazonCtx, {
    type: 'bar',
    data: {
      labels: ['Purchases', 'Reviews', 'Wishlist', 'Cart'],
      datasets: [{
        label: 'Data Points',
        data: [1000, 500, 500, 345],
        backgroundColor: '#f78166'
      }]
    },
    options: commonOptions
  });
}

function updateProfile(event) {
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword && newPassword !== confirmPassword) {
    alert('Passwords do not match!');
    return false;
  }

  // In a real application, you would send this to a server
  alert('Profile updated successfully!');
  return false;
}

// Initialize charts when the page loads
document.addEventListener('DOMContentLoaded', initializeCharts);