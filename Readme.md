# Repository for RPL Pet Books

client and server repository for software engineering final projects build with:

- Typescript
- Next
- Express
- PostgreSQL
- Docker

## Running the code

to run the client simply run

```javascript
    make install-client
    make run-client
```

to run the server simply run

```javascript
    make install-server
    make run-server
```

when you finish running the server dont forget to run

```javascript
    make stop-server-container
```

## Creating new branch

when you are working with new feature dont straightly push to the master branch, instead make a new branch, example:

```
    feature/Authentication
    feature/Donation
```

## Commit message

when commiting or pull request a new feature kindly use this format for the commit message

```
    for new feature: feat:<commit message>
    for bug fix: bug:<commit message>
```

example:

```
    feat:add new button
```
