const apiObj = {
  company: "quantrabbit",
};

// fetch api
const fetchApi = async (apiObj) => {
  const response = await fetch(
    "https://dev.laurentiumarian.ro",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiObj),
    }
  );
  const data = await response.json();
  return data;
};

const validate_data = (data, keyword) => {
  try {
    if (data[keyword][0] !== undefined && data[keyword][0] !== null && data[keyword][0] !== '') {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

const validate_company = (data) => {
  try{
    if (data['company'][0] !== undefined && data['company'][0] !== null && data['company'][0] !== '' && data['company'][0].toLowerCase().includes('interbrands') && data['company'][0] === apiObj.company) {
        return true
    }
  }catch (error) {
    return false
  }
  return false
};

const validate_link = (data) => {
  try {
    if (data['job_link'][0] !== undefined && data['job_link'][0] !== null && data['job_link'][0] !== '' && data['job_link'][0].includes('https://')) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

const validate_country = (data) => {
  try {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].name.toLowerCase().includes(data['country'][0].toLowerCase())) {
          return true
      }
    }
  } catch (error) {
    return false
  }
  return false
}

const create_job = (data) => {
  let jobElement = document.createElement('div')
  jobElement.classList.add('job')
  jobElement.innerHTML = `
      <h2 class="job-title ${
          validate_data(data, 'job_title') ? 'validate' : 'invalid'
      }">
          ${
              validate_data(data, 'job_title')
                  ? data.job_title
                  : 'No job title'
          }
      </h2>
      <div class="job-company ${
          validate_data(data, 'company') ? 'validate' : 'invalid'
      }">
          ${
              validate_data(data, 'company')
                  ? data.company
                  : 'No company'
          }
      </div>
      <div class="job-location">
          <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M17.5 8.33334C17.5 14.1667 10 19.1667 10 19.1667C10 19.1667 2.5 14.1667 2.5 8.33334C2.5 6.34421 3.29018 4.43656 4.6967 3.03003C6.10322 1.62351 8.01088 0.833336 10 0.833336C11.9891 0.833336 13.8968 1.62351 15.3033 3.03003C16.7098 4.43656 17.5 6.34421 17.5 8.33334Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 10.8333C11.3807 10.8333 12.5 9.71405 12.5 8.33334C12.5 6.95262 11.3807 5.83334 10 5.83334C8.61929 5.83334 7.5 6.95262 7.5 8.33334C7.5 9.71405 8.61929 10.8333 10 10.8333Z" stroke="#979C9E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <div class="${
                  validate_data(data, 'city') ? 'validate' : 'invalid'
              }"
              }">
                  ${
                      validate_data(data, 'city')
                          ? data.city
                          : 'No city'
                  }
              </div>, 
              <div class="${
                  validate_country(data) ? 'validate' : 'invalid'
              }">
                  ${
                      validate_country(data)
                          ? data.country
                          : data.country + ' is not a country'
                  }
              </div>
              
          </div>
          <a href="${data.job_link}" class="
          ${
              validate_link(data) ? 'validate' : 'invalid'
          }"
          ">
              Vezi Postul 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 4.99988M19 12L12 18.9999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </a>
      </div>
  `
  document.querySelector('.jobs').appendChild(jobElement)
}

const button = document.querySelector("button");
const svg = document.querySelector("svg");
const div = document.querySelector("div");
const a = document.querySelector("a");

button.addEventListener("click", () => {
  svg.classList.toggle("rotate");
  button.disabled = true;
  fetchApi(apiObj).then((data) => {
    svg.classList.toggle("rotate");
    button.disabled = false;
    if (data.succes) {
      document.querySelector("#status").innerHTML = "Active";
      document.querySelector("#jobs").innerHTML = data.Total;
      data.succes.forEach((job) => {
        create_job(job)
      })
    } else {
      document.querySelector("#status").innerHTML = "Inactive";
    }
  }).catch(() => {
    svg.classList.toggle("rotate");
    button.disabled = false;
    document.querySelector("#status").innerHTML = "Api Error";
  });
});