# douban
一个仿豆瓣电影的网站

获取豆瓣电影的数据，保存至数据库，前端页面展示信息

## 网站内容
- 正在热映
- 即将上映
- TOP250

## 技术选型
- 前端
    - AngularJS
- 后端
    - NodeJS
    - Mysql

## 数据库设计
- database： douban
- tables: movie
- charset: utf8

| 	Field  | 	Type	 | 	  Null	 |	  Key	 |	 Default | 	 Extra      |
|:---------|:-----------:|:---------:|:---------:|:---------:|:------------:|
|   id     |   int(10)	 |     No    |    PRI    |    Null   |auto_increment|
|  post    | varchar(255)|    yes    |    -	     |    Null   |      -       |
|  title   | varchar(255)|    yes    |    -      |    Null   |      -       |  
|  rate    |  float(4)   |    yes    |    -		 |    Null   |		-		|
|  link    | varchar(255)|    yes    |    -      |    Null   |      -       |   
    
