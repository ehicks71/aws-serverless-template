#! /bin/bash

# Defines directory name that holds the Lambda layers.
directory_name='layers'

# Gets the working directory path.
src_path=$(pwd)

# Sets the absolute path to the directory that holds the Lambda layers.
parent_directory=$src_path/$directory_name/

# Makes sure we start in the directory that holds the Lambda layers.
cd $parent_directory

# Loops through all Lambda directories and runs npm install.
for directory in */
do
    if [ -d $directory ]
    then
        echo $directory/nodejs
        cd $directory/nodejs
        npm install
        cd ../..
    fi
done

# You should now be back in the directory that holds the Lambda layers.
