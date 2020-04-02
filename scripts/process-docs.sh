#!/bin/bash

# created by sivagao in 9/9/2017

set -e

replace_dist_html_link() {
  local doc_tmp_path=$1
  local repo_name=$2
  if [ -d "$doc_tmp_path" ];then
    for html in "$doc_tmp_path"/*
    do
      if [ -d "$html" ];then
        replace_dist_html_link "$html" $repo_name
      elif [[ ! -d "$html" ]] && echo "$html" | grep -E '\.html$' > /dev/null;then
        set +e
        if grep -E 'href=\"\S+\.md' $html > /dev/null;then
          python scripts/convert_html.py $html $repo_name
        elif grep -E 'img src=\"[\.\/]*media\/' $html > /dev/null;then
          python scripts/convert_html.py $html $repo_name
        fi
        set -e
      fi
    done
  fi
}

cn_tmp_docs_path="dist/docs-cn"
en_tmp_docs_path="dist/docs"
tidb_docs_versions=(stable dev v2.1 v3.1)
operator_docs_versions=(stable dev v1.1)
dm_docs_versions=(stable dev)
misc_repos=(blog-cn blog meetup weekly)

python scripts/convert_html.py "$en_tmp_docs_path/index.html" "docs"
python scripts/convert_html.py "$cn_tmp_docs_path/index.html" "docs-cn"

start_time=$(date +%H%M%S)
echo "start time" $start_time
for v in "${tidb_docs_versions[@]}"
do
{
  echo "$en_tmp_docs_path/$v"
  echo "$cn_tmp_docs_path/$v"
  replace_dist_html_link "$en_tmp_docs_path/$v" "docs/$v"
  replace_dist_html_link "$cn_tmp_docs_path/$v" "docs-cn/$v"
} &
done

for v in "${operator_docs_versions[@]}"
do 
{ 
  echo "$en_tmp_docs_path/tidb-in-kubernetes/$v"
  echo "$cn_tmp_docs_path/tidb-in-kubernetes/$v"
  replace_dist_html_link "$en_tmp_docs_path/tidb-in-kubernetes/$v" "docs/tidb-in-kubernetes/$v"
  replace_dist_html_link "$cn_tmp_docs_path/tidb-in-kubernetes/$v" "docs-cn/tidb-in-kubernetes/$v"
} &
done

for v in "${dm_docs_versions[@]}"
do
{
  echo "$en_tmp_docs_path/tidb-data-migration/$v"
  echo "$cn_tmp_docs_path/tidb-data-migration/$v"
  replace_dist_html_link "$en_tmp_docs_path/tidb-data-migration/$v" "docs/tidb-data-migration/$v"
  replace_dist_html_link "$cn_tmp_docs_path/tidb-data-migration/$v" "docs-cn/tidb-data-migration/$v"
} &
done

for repo in "${misc_repos[@]}"
do 
{
  echo "dist/$repo"
  replace_dist_html_link "dist/$repo" "$repo"
} &
done

wait
end_time=$(date +%H%M%S)
echo "end time" $end_time

replace_dist_html_link "dist/cases-cn" blog-cn
replace_dist_html_link "dist/success-stories" blog
echo "finish all replacement"

parent_dir="`echo $(pwd) | sed 's;/scripts;;g'`/dist"
copy_images_from_media_to_dist() {
  repo_name=$1
  media_path=$(echo $parent_dir/$repo_name/media)

  if [ ! -d $parent_dir/images/$repo_name ]; then
    mkdir -p $parent_dir/images/$repo_name
  fi

  [ -d $media_path ] && mv $media_path/* $parent_dir/images/$repo_name
}

# mv all content in media to dist/images
copy_images_from_media_to_dist docs/v2.1
copy_images_from_media_to_dist docs/dev
copy_images_from_media_to_dist docs/stable
copy_images_from_media_to_dist docs/v3.1
copy_images_from_media_to_dist docs-cn/v2.1
copy_images_from_media_to_dist docs-cn/dev
copy_images_from_media_to_dist docs-cn/stable
copy_images_from_media_to_dist docs-cn/v3.1
copy_images_from_media_to_dist blog-cn
copy_images_from_media_to_dist blog
# copy_images_from_media_to_dist weekly
copy_images_from_media_to_dist meetup
