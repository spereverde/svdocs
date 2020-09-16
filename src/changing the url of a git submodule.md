---
layout: layouts/base.njk
title: changing the url of a git submodule
tag: ["git"]
---

## description

- we migrated a git repo from an older repository management tool to another one ([Gitea](https://gitea.io/))
- this repo is a submodule for all of our other packages
- this is the (manual) procedure to change the url of the existing submodule in a package

## procedure

- clone the package that uses the old submodule
  - `git clone $your_repo_git_url`
- edit the `.gitmodules` file: update the url to the new git url of the submodule:

```
[submodule “$submodule_name”]
        path = common_buildout
        url = $new_git_url_of_submodule
```

- `git submodule update —init —remote $submodule_name`
- `git add .gitmodules`
- `git commit -m ‘update submodule url’`
- `git push`

## Makefile

- we use Makefiles in our setups to handle the submodules
- As described in [How to change the remote repository for a git submodule? - Stack Overflow](https://stackoverflow.com/questions/913701/how-to-change-the-remote-repository-for-a-git-submodule)
  you should run
  `git submodule update —init —remote $submodule_name`
  to update the pointer to the latest commit hash of the given submodule

- Makefile:

```
setup:
        git submodule update --init --remote $submodule_name
```

- then every time you clone a package you can run `make setup`

## git submodule update command breakdown

- `git submodule update --init --remote common_buildout` is one command that performs the following submodule actions in one step:
  - `git submodule init`: to initialize your local configuration file (sets `submodule.$name.url` in `.git/config`).
  - `git submodule update`: to fetch all the data from that project and check out the appropriate commit listed in your superproject
  - `git —update remote submodule_name`: Git will go into the submodule with the name provided and fetch and update for you.
    -     `git —update remote`: Git will go into all your submodules and fetch and update for you.

## references

- [Git - Submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
- [Git - git-submodule Documentation](https://git-scm.com/docs/git-submodule)
- [How to change the remote repository for a git submodule? - Stack Overflow](https://stackoverflow.com/questions/913701/how-to-change-the-remote-repository-for-a-git-submodule)
- if you also need to change the path of the submodule, this might be helpful: [How do I move an existing Git submodule within a Git repository? - Stack Overflow](https://stackoverflow.com/questions/4604486/how-do-i-move-an-existing-git-submodule-within-a-git-repository)
