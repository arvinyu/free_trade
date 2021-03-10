<?php
namespace Admin\Controller;
use User\Api\UserApi as UserApi;

class EnterpriseController extends AdminController {

    public function index(){
       $nickname = I('nickname');
        $map = array('status'=>array('egt',0));
        if(isset($nickname)){
            if(intval($nickname) !== 0){
                $map['uid'] = intval($nickname);
            }else{
                $map['nickname']  = array('like', '%'.(string)$nickname.'%');
            }
        }
        $list   = $this->lists('Member', $map);
        int_to_string($list);
        $this->assign('_list', $list);
        $this->meta_title = '用户信息';
        $this->display();
    }

}
