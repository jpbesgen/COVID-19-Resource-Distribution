import os


def main():
    print("WARNING: This python script is a work in progress. The steps below may not work for you, even if you"
          "have MacOS running on your machine. If anything, copy/paste the commands in this file to your own terminal"
          "for a guaranteed install on MacOS. Otherwise, go to "
          "https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html for a complete install.")

    os.system('curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"')
    os.system('sudo installer -pkg ./AWSCLIV2.pkg -target /')
    os.system('rm "AWSCLIV2.pkg"')

    print("Done!")


if __name__ == "__main__":
    if str(os.system("which aws")) != "":
        print("Congrats! The AWS CLI is already installed on your machine. Terminating...")
        exit()
    main()
