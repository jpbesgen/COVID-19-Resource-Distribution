# COVID-19-Resource-Distribution
Our goal for this project is to create a network for the production &amp; distribution of medical parts (such as 
ventilators, masks, gloves, etc.) by connecting medical institutions with those who have a surplus of medical supplies 
or with those who can design/create parts. 

# Deploying Frontend Changes with the AWS CLI
In order to push changes from the local file repository to the production S3 bucket on AWS will be using the AWS CLI. 
If the AWS CLI is not yet installed and configured, please go to [here](#Installing and configuring the AWS CLI).
Otherwise, here are the steps for pushing to production:
1) Add all relevant frontend files to `s3include.txt`. This file contains all of the files and folders required to make
the frontend work. All files and folders are listed on separate lines. Folders must end with `/` in order for the 
production pushing script to work as intended.
2) Once all relevant files are in `s3include.txt`, just run `python push_to_prod.py` to push all relevant changes onto
production.
Please note that this is only a temporary solution to pushing changes into the S3 bucket. In the future, GitHub 
webhooks will be added to this repo such that any branch merges into master will trigger an upload of all relevant 
files to the correct place.

# Installing and configuring the AWS CLI
In order to download the AWS CLI, simply go into the `setup_scripts` directory and run `python download_aws.py`. Please
note thought that so far this script is still in development and may not work as intended. However, the proper 
instructions on how to download the AWS CLI on your machine can be found 
[here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html). After that is installed, run 
`python setup_aws.py` to create set up the credentials. Please note that the file `credentials.csv` must be present in 
main folder of the repository in order for this script to work.
