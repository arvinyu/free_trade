<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;

/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends HomeController {

	//系统首页
    /*public function index(){
    	if(IS_CLI){
            $data = M('Content')->field("id,content")->select();
            foreach ($data as $value) {
                $value['content'] = ubb($value['content']);
                M('Content')->save($value);
            }

        } else {
            $category = D('Category')->getTree();
            $lists    = D('Document')->lists(null);

            $this->assign('category',$category);//栏目
            $this->assign('lists',$lists);//列表
            $this->assign('page',D('Document')->page);//分页

            $this->display();
        }
    }*/

    //系统首页
    public function index(){
        if(IS_CLI){
            $data = M('Content')->field("id,content")->select();
            foreach ($data as $value) {
                $value['content'] = ubb($value['content']);
                M('Content')->save($value);
            }

        } else {

            
            // $category = $this->category(39);
            // // $list = $Document->page(1, $category['list_row'])->lists($category['id']);
            /* 获取当前分类列表 */

            /* banner分类信息 */
            $Document = D('Document');

            $news = $Document->newsList();
            if(false === $news){
                $this->error('获取news列表数据失败！');
            }
            $this->assign('news_list',$news);//news列表

            /* 园区概况 */
            $yqgk = $Document->yqgk();
            // dump($projects);exit;
            if(false === $yqgk){
                $this->error('获取园区概况列表数据失败！');
            }
            $this->assign('yqgk',$yqgk);

            /* 园区动态 */
            // $projects = $Document->projectList();
            $projects = $Document->yqdt();
            // dump($projects);exit;
            if(false === $projects){
                $this->error('获取动态列表数据失败！');
            }
            $this->assign('projects',$projects);//项目建设列表

            /* 聚焦曹妃 */
            // $enterprises = $Document->enterpriseList();
            $enterprises = $Document->jjcf();
            // dump($enterprises);exit;
            if(false === $enterprises){
                $this->error('获取企业风采数据失败！');
            }
            $this->assign('enterprises',$enterprises);//企业风采

            /* 园区子分类 */
            $sub_park = $Document->parkSubCategory();
            if(false === $sub_park){
                $this->error('获取园区子分类数据失败！');
            }
            // dump($sub_park);exit;
            $this->assign('sub_parks',$sub_park);//园区子分类

            /* 价格指数 */
            $price = $Document->price();
            if(false === $price){
                $this->error('获取价格指数数据失败！');
            }
            // dump($price);exit;
            $this->assign('price',$price);//价格指数

            $price_list = $Document->priceList();
            if(false === $price_list){
                $this->error('获取价格指数列表数据失败！');
            }
            // echo $Document->getLastSql();
            // dump($price_list);exit;
            $this->assign('price_list',$price_list);//价格指数列表

            /* 公共服务 */
            $services_lists = $Document->servicesList();
            if(false === $services_lists){
                $this->error('获取公共列表数据失败！');
            }
            $this->assign('services_lists',$services_lists);//营商环境

            /* 营商环境 */
            $building_lists = $Document->buildingList();
            if(false === $building_lists){
                $this->error('获取营商环境列表数据失败！');
            }
            $this->assign('building_lists',$building_lists);//营商环境

            /* 专题推荐 */
            $push_lists = $Document->pushList();
            if(false === $push_lists){
                $this->error('获取专题推荐列表数据失败！');
            }
            $this->assign('push_lists',$push_lists);//专题推荐


            $category = D('Category')->getTree();
            $lists    = D('Document')->lists(null);

            $this->assign('category',$category);//栏目
            $this->assign('lists',$lists);//列表
            $this->assign('page',D('Document')->page);//分页

            $this->display();
        }
    }

    public function upload(){
    	if(IS_POST){
            //又拍云
            // $config = array(
            //     'host'     => 'http://v0.api.upyun.com', //又拍云服务器
            //     'username' => 'zuojiazi', //又拍云用户
            //     'password' => 'thinkphp2013', //又拍云密码
            //     'bucket'   => 'thinkphp-static', //空间名称
            // );
            // $upload = new \COM\Upload(array('rootPath' => 'image/'), 'Upyun', $config);
            //百度云存储
            $config = array(
                'AccessKey'  =>'3321f2709bffb9b7af32982b1bb3179f',
                'SecretKey'  =>'67485cd6f033ffaa0c4872c9936f8207',
                'bucket'     =>'test-upload',
                'size'      =>'104857600'
            );
    		$upload = new \COM\Upload(array('rootPath' => './Uploads/bcs'), 'Bcs', $config);
    		$info   = $upload->upload($_FILES);
    	} else {
    		$this->display();
    	}
    }

    public function upyun(){
        $policydoc = array(
            "bucket"             => "thinkphp-static", /// 空间名
            "expiration"         => NOW_TIME + 600, /// 该次授权过期时间
            "save-key"            => "/{year}/{mon}/{random}{.suffix}",
            "allow-file-type"      => "jpg,jpeg,gif,png", /// 仅允许上传图片
            "content-length-range" => "0,102400", /// 文件在 100K 以下
        );

        $policy = base64_encode(json_encode($policydoc));
        $sign = md5($policy.'&'.'56YE3Ne//xc+JQLEAlhQvLjLALM=');

        $this->assign('policy', $policy);
        $this->assign('sign', $sign);
        $this->display();
    }

    public function test(){
        $table = new \OT\DataDictionary;
        echo "<pre>".PHP_EOL;
        $out = $table->generateAll();
        echo "</pre>";
        // print_r($out);
    }

}
