# Project Setup

- Initialize nodejs project (npm init)
- Install required packages
- Import data from Dataset.csv to mongodb and es (scripts/import)
    -- https://c2fo.github.io/fast-csv/docs/introduction/example

## Start Project

- npm install
- docker-compose up -d
- node scripts/import.js

## Step 1

- Read csv
- Import to mongodb

## Step 2

- Import to es 
    - Bulk API => https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
- Start basic server
    - Required Packages => express, morgan (logger)

## Step 3

- React setup (d3 js)
- Do db ops