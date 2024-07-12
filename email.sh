#!/bin/sh

git filter-branch -f --env-filter "

GIT_AUTHOR_NAME='jason-50302911'; 
GIT_AUTHOR_EMAIL='s50302911@gmail.com'; 
GIT_COMMITTER_NAME='jason-50302911';
GIT_COMMITTER_EMAIL='s50302911@gmail.com';

"HEAD