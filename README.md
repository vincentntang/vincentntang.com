Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/d414dc8a-216c-4a9e-a580-de23bf06617f/deploy-status)](https://app.netlify.com/projects/vincent-tang-com-fw/deploys)


# vincentntang.com

Vincents's personal website running on Gatsby, React, and Node.js.

Based on Tania's blog (7.1), followed private submodules as well

For content updates, pull a repo called

```
vincentntang.com/vincentntang-content
```

Run these commands

```
git submodule update --remote
git submodule add https://github.com/vincentntang/vincentntang-content content
```

update submodule content

```
git submodule update --remote
```

## Troubleshooting

If submodules are out of sync, try this

```
cd .git
delete modules folder
git submodule update --init --recursive
```

should repopulate the content folder assuming `.gitmodules` is there