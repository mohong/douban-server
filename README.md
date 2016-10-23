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
| status   | varchar(255)|    yes    |    -      |    Null   |      -       |

参数说明

- `id`：主键，自增
- `post`：电影封面的链接地址
- `title`：电影标题
- `rate`：平均评分
- `link`：豆瓣的电影详情页面地址
- `status`：电影状态，有两个值
 	- `nowplaying` 正在上映
 	- `later` 即将上映
 	
 	
## 开发方式
采用前后端完全分离，ajax跨域请求数据。
### 后端主要业务
根据请求路径，查询不同的数据，以json形式提供给前端使用


