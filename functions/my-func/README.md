Overview

Cloud Functions are a server-free, single-purpose, and event-driven solution. They can also be run on HTTP/HTTPS requests. Each request/event is processed by a new instance of the function and provides reliable isolation between each call. Functions automatically scale and are highly available and fault-tolerant. Cloud Functions are great for building serverless backends, doing real-time data processing, and creating intelligent apps.

Use cases

Single-purpose workload, especially event-based (PubSub, Storage, Firestore / Firebase, etc), but also triggered by HTTP (has built-in public URL by default that can be protected using different options for Auth). Image transformation, micro-packaging (less than 9 minutes duration), streaming, data processing by schedule, clearing not actual data in DB, etc are common use cases.

Warning!

Functions are stateless, and the execution environment is often initialized from scratch, which is called a cold start. Cold starts can take significant amounts of time to complete. It is best practice to avoid unnecessary cold starts and to streamline the cold start process to whatever extent possible (for example, by avoiding unnecessary dependencies). More info here.

Also, the maximum amount of time a function can run before it's forcibly terminated is 9 minutes. More info here.

1. Setup Cloud Function from boilerplate

First of all, in a project repository in folder cloud-functions create a subfolder with the name of your function.

Function name must contain only lower case Latin letters, digits, and a hyphen (-). It must start with a letter, must not end with a hyphen, and must be at most 63 characters long.

For example my-func. In the second step need to copy all files from folder function-boilerplate to your folder that was created in the previous step (in my example this folder will be my-func). 

After that install all dependencies inside of the function subfolder using commands npm i or yarn install.

1.1. Manual deploying

Before doing this step please set up the GCP console on your local machine and login in to it with your Truepill google account. Link on GCP CLI here.

The second step is configuring Cloud Function is set to function name for manual deploying. First of all, open the package.json inside your function subfolder.

In the section scripts in line with command “deploy“ need to change the name of deploying function from function-boilerplate to your function name with suffix -local.

In my example above it will be my-func-local. Also, you can change the section name, description, or version if you need.

After that, you can deploy your function from your local computer using the npm deploy command. In this case, the pipeline will not start and in fact, you are deploying your function directly.

Sometimes this can be useful for testing a feature during development.

1.2. Set pipeline configurations files for auto-deploy on push in a git repository

After configuring package.json we need to configure *.cloudbuilds.yaml files for automatically deploying and building the function on pushing code in the branches “main”, “develop” and “release”.

For each branch, we have a separate cloud build file with the branch' name prefix in the file name. For example, for the branch “develop”. It’s the file “dev.cloudbuilds.yaml” and for the “main“ branch it’s the file “main.cloudbuilds.yaml” and for branch “release“ it’s “rs.cloudbuilds.yaml”. You need to configure each of them.

First of, all we will config pipeline files for branch develop. For this need to open file dev.cloudbuilds.yaml and set for parameters in section substitutions in the bottom of the file needing values.

`substitutions:
_FUNCTION_PROJECT : $PROJECT_ID # This is project ID not a name!
_FUNCTION_NAME    : my-func
_FUNCTION_REGION  : us-central1
_FUNCTION_RUNTIME : nodejs16
_FUNCTION_DIR : my-func`

You need to set _FUNCTION_NAME. This is the name of the function. In the optimal case, it should be the same as the name of the function subfolder in a repository. This is the name that will show in the functions list in the cloud. In my example, it will be my-func. Please don't confuse this with the name of the function handler in file index.ts. All these function handlers have identical names funcHandler.

Also, need to set _FUNCTION_DIR. This is a function subfolder name inside of the repository. In my case, it will be my-func.

As additional options, you can change _FUNCTION_RUNTIME or _FUNCTION_REGION if need. By default, this is Node.js v16 and region us-central1. The last one is a region where is located the GCP data center with this cloud function.

Also, you need to repeat all steps from this chapter for files rs.cloudbuilds.yaml and main.cloudbuilds.yaml. All values that you will set in these files will be similar to values from dev.cloudbuilds.yaml.

1.3 Creating triggers for auto-deploy  on push in a git repository

Go to the GCP Cloud Build console on the tab “Triggers”  here. Now, we need to create a new trigger for auto deploy our function on pushing in the branches “main”, “develop” and “release”. For this click on a button “+ CREATE TRIGGER“ on the top of the window.

On the page that was opened first of all need to set the trigger name. Trigger name has the next structure.

The first part is the project name like a tp. The second part is a type of resource for that trigger is being created. In our case, it’s cf like a cloud function. The next part will be a function name. For us, this is a my-func. And last part of the trigger name is a branch that will activate it. For example develop, release, prod. The last one will be for the branch “main”.

There are examples of names for triggers:

tp-cf-recalculate-fee-prod (truepill, cloud function, “recalculate-fee-prod”, production)

tp-cf-recalculate-fee-develop (truepill, cloud function, “recalculate-fee-prod”, develop)

tp-cf-processing-of-new-orders-develop (truepill, cloud function, “processing-of-new-orders”, develop)

tp-cf-processing-of-new-orders-release (truepill, cloud function, “processing-of-new-orders”, develop)

In my case, I’m creating a trigger for the branch “develop“ with the name “tp-cf-my-func-develop”. Also, add the description with an explanation of what exactly do this function and tags. As one of a tag, you can add the branch name. In my case, it’s “develop“.

In section “Source“ need to select the repository and branch that will run the trigger. The branch name can be set as regexp or simple text as it is strict. For me, it will be a strict branch name “develop“.

On the next step, click on the text “Show included and ignored files filters“at the bottom of the section. After that will be opened two input fields. In the first one, you need to set a path inside of your repository that contained your function source. In my case it’s “functions/my-func/**“. Please attention to the last part of the path which means all files inside of the folder. After typing the path press Enter. Also, you can add several outside paths that will be triggering deploying and rebuilding your cloud function. It can be helpful in case you have some outside requirements in other folders that are outside of the subfolder with your function. For example, it can be a file with some type description in the external folder “types”. Therefore add the path to this file too. For example “backend/src/types/some-type.ts“.

In addition, you can add files and subfolders inside your subfolders whose changes will be ignored by the trigger.

In the next section of the “Create trigger“ page that has the name “Configuration“, you need to set the cloud build file name. In our case for the branch “develop“ it’s a “functions/my-func/dev.cloudbuild.yaml”. Be attention this should be a full path inside of the repository to the build file. We have created this one on the previous step “Set pipeline configurations files for auto-deploy on push in a git repository”.

Now you can press the “Create” button. After that, your new trigger should be visible in the triggers list.

Also, you need to create triggers for other branches. There are main and release. They will have very similar configs with different cloud build files and file filter subfolders that will be specified for these branches.

1.4. Set env runtime variables

The last step is adding runtime environment variables if this is needed.

