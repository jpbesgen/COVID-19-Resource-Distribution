import os
from pathlib import Path
home = str(Path.home())


def main():
    with open("s3include.txt", "r") as include_file:
        lines = include_file.readlines()
    lines = [line.strip() for line in lines]
    files = [line for line in lines if line[-1] != "/"]
    folders = [line for line in lines if line[-1] == "/"]

    for file in files:
        os.system(f"aws s3 cp {file} s3://resource19.org/")
    print("INFO: Uploaded all relevant files!")

    for folder in folders:
        os.system(f"aws s3 cp --recursive {folder} s3://resource19.org/{folder}")
    print("INFO: Uploaded all relevant folders!")


if __name__ == "__main__":
    if str(os.system("which aws")) == "":
        print("ERROR: You currently do not have the AWS CLI installed. Please install and try again.")
        exit()
    if not os.path.exists(home + "/.aws/credentials"):
        print("ERROR: AWS Credentials are not currently set up. Please set up your credentials.")
    main()
