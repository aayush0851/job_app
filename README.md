# JOB APP by aayush0851

#### Setup  Instructions
1. Make a file ```.env``` as sibling file of ```.env.example```
2. Copy ```.env.example``` as ```.env```, add details, replace the placeholder values with actual values.
3. Start your mongo server.
4. Run command ```npm run debug``` to run the app
____

#### TEST-DATA for testing the END_POINTS

# RECRUITER
  1. email: ```recruiter@job.com```
  2. password: ```secret```
  3. Earlier posted job_id: ```60ad13038d649c2317295729```


# CANDIDATE
  1. email: ```candidate@job.com```
  2. password: ```secret```
  3. (In reference to the job_id for the recruiter stated above) application_id: ```60ad21b48d649c2317295731```


#### ENP-POINTS AND REQUESTS
### Public Routes

1. POST ```BASE_URL/recruiters/signup```
  CREATES A NEW RECRUITER
    A. Takes in the following parameters
      1. ```organization_name```          string(min:3) REQUIRED (body)
      2. ```organization_description```   string                 (body)
      3. ```address```                    string                 (body)
      4. ```website```                    string        REQUIRED (body)
      5. ```email```                      string        REQUIRED (body)
      6. ```password```                   string        REQUIRED (body)
      7. ```confirm_password```           string        REQUIRED (body)

2. POST ```BASE_URL/recruiters/login```
  RECRUITER LOGIN
    A. Takes in the following parameters
      1. ```email```                      string        REQUIRED (body)
      2. ```password```                   string        REQUIRED (body)

3. POST ```BASE_URL/candidates/signup```
  CREATES A NEW CANDIDATE
    A. Takes in the following parameters
      1. ```first_name```                 string(min:3)   REQUIRED (body)
      2. ```last_name```                  string                   (body)
      3. ```date_of_birth```              string          REQUIRED (body)   ```YYYY-MM-DD```
      4. ```phone_number```               string(min:10)           (body)
      5. ```working_experience_yrs```     number          REQUIRED (body)
      6. ```portfolio_link```             string                   (body)
      7. ```email```                      string          REQUIRED (body)
      8. ```password```                   string          REQUIRED (body)
      9. ```confirm_password```           string          REQUIRED (body)

4. POST ```BASE_URL/candidates/login```
  CANDIDATE LOGIN
    A. Takes in the following parameters
      1. ```email```                      string        REQUIRED (body)
      2. ```password```                   string        REQUIRED (body)

5. GET ```BASE_URL/home/```
  HOME: LISTS ALL OPEN JOBS


### Protected Routes
All of the following routes need jwt token received at the time of login
The token is to be sent to the server inside headers ```(req.headers.authorization)```
```Authorization```: ```jwtoken```


1. POST ```BASE_URL/logout```
  LOGS USER OUT (BLACKLISTS THE CURRENT TOKEN IN USE)

# Recruiter Side

1. POST ```BASE_URL/jobs/```
  POSTS A NEW JOB OPENING
    A. Takes in the following parameters
      1. ```job_position```                 string          REQUIRED (body)
      2. ```job_description```              string          REQUIRED (body)
      3. ```job_type```                     string          (body)  ALLOWED:```part-time/full-time/internship``` (default: ```full-time```)
      4. ```no_of_vacancies```              number(min:1)   REQUIRED (body)

2. GET ```BASE_URL/jobs/:job_id/list-candidates```
  LISTS ALL CANDIDATES WHO APPLIED TO A JOB
    A. Takes in the following parameters
      1. ```job_id```                       string          REQUIRED (params)

3. PUT ```BASE_URL/applications/:application_id```
  ACCEPTS OR REJECTS AN APPLICATION
    A. Takes in the following parameters
      1. ```application_id```               string          REQUIRED (params)
      2. ```application_status```           string          REQUIRED (body)    ALLOWED: ```pending/accepted/rejected```


# Candidate Side

1. GET ```BASE_URL/candidates/my-applications```
  LISTS ALL THE APPLICATIONS AND JOB THAT THE CANDIDATE HAS APPLIED TO

2. POST ```BASE_URL/applications/```
  APPLY TO ONE OR MORE JOB
    A. Takes in the following parameters
      1. ```job_ids```                      string          REQUIRED (body) (Takes in a string of jobIds separated by commas)
        eg: ```job_ids```: ```id_1,id_2,id_3``` for as many jobs one wants to apply to

3. DELETE ```BASE_URL/applications/:application_id```
  DELETES AN APPLICATION
    A. Takes in the following parameters
      1. ```application_id```               string          REQUIRED (params)