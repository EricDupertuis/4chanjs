# 4Chan.js thread scrapper

This project is not in an advanced state and is error prone. Don't hesitate to open an issue if you encounter an error.

## Install

    npm install -g 4chan-js

## Usage

    -f : Specify a folder where you want to save your images
    -e : specify a file format you don't want to download (ex: -e gif)
    --noanimation : doesn't download gifs and webms
    -u : url of the thread
    -m : Specify file system permissions (ex: -e 777) 755 will be used by default

## Example

    4chan -e png -u https://boards.4chan.org/b/thread/0000000/thread


## What it can currently do :
    - Download all images and webms from a thread
    - Exclude by one or multiple patterns
    - Not much else

## What will it do in the futur :
    - Download depending on file size
    - Easily automate scrapping
    - Generation of an html page with all images

## What it will never do:
    - Coffee, sadly
    - Scrap other websites
    - Scrap entire boards

If you're interested to work on this, have questions or want to yell at me (bad code and stuff): [@dupertuiseric](https://twitter.com/dupertuiseric)

__Currently no Windows support__
