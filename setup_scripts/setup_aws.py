import os
import csv
from pathlib import Path
home = str(Path.home())


def main():
    with open('./../credentials.csv', 'r') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        csv_data = [row for row in csv_reader]
    columns, data = csv_data
    csv_dict = (dict(zip(columns, data)))

    if not os.path.exists(home + "/.aws/"):
        os.mkdir(home + "/.aws/")
        print("INFO: Created directory `~/.aws`")
    if os.path.exists(home + "/.aws/credentials"):
        os.remove(home + "/.aws/credentials")
        print("INFO: Deleted existing file `~/.aws/credentials`")
    if os.path.exists(home + "/.aws/config"):
        os.remove(home + "/.aws/config")
        print("INFO: Deleted existing file `~/.aws/config`")

    with open(home + "/.aws/credentials", "w+") as cred_file:
        cred_file.write(f"[default]"
                        f"\naws_access_key_id = {csv_dict['Access key ID']}"
                        f"\naws_secret_access_key = {csv_dict['Secret access key']}\n")
    print("INFO: Created new file `~/.aws/credentials/`")

    with open(home + "/.aws/config", "w+") as cred_file:
        cred_file.write(f"[default]"
                        f"\nregion = us-west-1\n")
    print("INFO: Created new file `~/.aws/config/`")
    print("Done!")


if __name__ == "__main__":
    if str(os.system("which aws")) == "":
        print("WARNING: AWS CLI is not yet installed! Please run `download_aws.py` first.")
        exit()
    if not os.path.exists("./../credentials.csv"):
        print("WARNING: `credentials.csv` not found in directory! Please get this file from AWS and try again.")
        exit()
    if os.path.exists(home + "/.aws/credentials"):
        print("WARNING: credentials file in your `~/.aws/` directory will be overwritten.")
    main()
