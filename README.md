# Dagda Quickstart

## Specifications
|   |       |
|---|-------|
|Drupal | 11.2  |
|PHP    | 8.3   |
|Apache | 2.4   |
|MariaDB| 10.11 |

## Installation
#### Git
```
```
#### ddev
```
ddev start
ddev project:setup
```

## Usage
### Drupal Configuration
The settings files are versioned on the Git Repo.
The `settings.php` is the same on every environment. It will call a `settings.[ENVIRONMENT_NAME].php`.
A `settings.local.php` is also called if it exists but is listed as ignored in the `.gitignore` file to allow a unversioned override.
Every sensitive information should be set in the ENV file for each environment or any environment variable system (Secret, GitLab Variables,...)

### Tooling

#### PHPStan
__Usage :__

```
ddev phpstan analyse web/**/custom
```

#### PHPCS
__Usage :__

To analyse existing code Base :
```
ddev phpcs -p --colors --standard="Drupal,DrupalPractice" --extensions="php,inc,module,install,test,profile,theme" --ignore="*/vendor/*,*/bootstrap/*,*/tests/*,*/.gitlab-ci/*,Readme.md,style.css,print.css,*Test.php"  web/**/custom/
```

#### PHPCompatibility
To check compatibility of code with PHP Version :
```
ddev phpcs -p --colors --standard=vendor/phpcompatibility/php-compatibility/PHPCompatibility --ignore="web/core/*" --extensions=php,module,theme  web/**/custom/ --runtime-set testVersion 8.1
```


#### Project Sync
Allow to get the Database and Files from some remote environments.

```
# Syncronize SSH Keys (should only be needed the first time)
ddev auth ssh
ddev project:sync @environement
```
*Available environement*
- NON AT THE MOMENT

#### Theme tooling
Watch and rebuild the Tailwind file on modification in the theme.

```
ddev lug:build
ddev lug:node
ddev lug:npm
ddev lug:npx
ddev lug:watch
```

#### BrowserSync
Enable BrowserSync on https://dagda.ddev.site:3000 (May bug on some POST Request)
```
ddev browsersync
```

### CI/CD
A basic CI/CD is included in this Boilerplate.

#### Build
Build the project using Composer. Is automatically launched on Merge Request, Stage, Master and Tags. Create an artifact containing :
```
- vendor
- web/core
- web/modules/contrib
- web/profiles/contrib
- web/themes/contrib
- web/libraries
- drush/Commands
```
#### Quality Assurance
Automatically verify the quality of the code using PHPStan and PHPcs. The finding od Error or Warning are not blocking by default. This could be blocking to maintain a clean project.
Launch on Merge Request and commit on Master.

#### Deploy
Provide a Deploy step for a VPS environment. A standard Docker environment will be provided in the future.
By default, those steps are disabled as the Environment must be configured on the Server and on Gitlab. This should be done with the help of a Ops.
The folders structure on the server should follow this structure :
- path/to/project
  - current/ -> Last Release
  - dump/
  - releases/
  - shared
    - private_files/
    - sites/


##### Stage
Will be available as a Manual action on commit on Stage Branch and Merge Request.
##### Production
Will be available as a Manual action on Tags.
