# ynab-cli

YNAB CLI synchronization tool

<!-- toc -->

- [ynab-cli](#ynab-cli)
- [Usage](#usage)
- [Commands](#commands)

<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g ynab-cli
$ ynab COMMAND
running command...
$ ynab (--version)
ynab-cli/0.0.1 darwin-x64 node-v18.12.1
$ ynab --help [COMMAND]
USAGE
  $ ynab COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [ynab-cli](#ynab-cli)
- [Usage](#usage)
- [Commands](#commands)
  - [`ynab auth login ARG`](#ynab-auth-login-arg)
  - [`ynab auth logout ARG`](#ynab-auth-logout-arg)
  - [`ynab auth whoami ARG`](#ynab-auth-whoami-arg)
  - [`ynab connections add ARG`](#ynab-connections-add-arg)
  - [`ynab connections list ARG`](#ynab-connections-list-arg)
  - [`ynab connections remove ARG`](#ynab-connections-remove-arg)
  - [`ynab help [COMMANDS]`](#ynab-help-commands)
  - [`ynab sync run ARG`](#ynab-sync-run-arg)
  - [`ynab sync status ARG`](#ynab-sync-status-arg)

## `ynab auth login ARG`

LOGIN command

```
USAGE
  $ ynab auth login [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  LOGIN command
```

## `ynab auth logout ARG`

LOGOUT command

```
USAGE
  $ ynab auth logout [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  LOGOUT command
```

## `ynab auth whoami ARG`

WHOAMI command

```
USAGE
  $ ynab auth whoami [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  WHOAMI command
```

## `ynab connections add ARG`

ADD command

```
USAGE
  $ ynab connections add [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  ADD command
```

## `ynab connections list ARG`

LIST command

```
USAGE
  $ ynab connections list [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  LIST command
```

## `ynab connections remove ARG`

REMOVE command

```
USAGE
  $ ynab connections remove [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  REMOVE command
```

## `ynab help [COMMANDS]`

Display help for ynab.

```
USAGE
  $ ynab help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for ynab.
```

## `ynab sync run ARG`

RUN command

```
USAGE
  $ ynab sync run [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  RUN command
```

## `ynab sync status ARG`

STATUS command

```
USAGE
  $ ynab sync status [ARG] -f <value>

ARGUMENTS
  ARG  Required arg

FLAGS
  -f, --flag=<value>  (required) Required flag

DESCRIPTION
  STATUS command
```

<!-- commandsstop -->
