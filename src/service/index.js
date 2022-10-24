import { request } from './request'

// 登入
// export function authorizationLogin(params) {
//   return request({
//     url: '/yidou/login',
//     method: 'get',
//     params
//   })
// }
export function getUserInfo(data) {
  return request({
    url: '/yidou/userinfo',
    method: 'post',
    data
  })
}

// 查询签到情况
export function getSigninList(data) {
  return request({
    url: '/YiDouManage/querysign',
    method: 'post',
    data
  })
}

// 签到
export function setSignin(data) {
  return request({
    url: '/YiDouManage/sign',
    method: 'post',
    data
  })
}

// 查询翼豆数量
export function getBeanCount(data) {
  return request({
    url: '/YiDouManage/queryyd',
    method: 'post',
    data
  })
}

// 获取抽奖次数
export function getSmokeCount(data) {
  return request({
    url: '/YiDouManage/cjcs',
    method: 'post',
    data
  })
}

// 获取抽奖资格
export function getQualification(data) {
  return request({
    url: '/YiDouManage/cjzg',
    method: 'post',
    data
  })
}

// 抽奖奖励
export function getReward(data) {
  return request({
    url: '/YiDouManage/choujiang',
    method: 'post',
    data
  })
}

// 查询翼豆获取消耗记录
export function getConsumption(data) {
  return request({
    url: '/YiDouManage/gethis',
    method: 'post',
    data
  })
}

// 查询当月翼豆消耗获取总数
export function getConsumptionNum(data) {
  return request({
    url: '/YiDouManage/getnum',
    method: 'post',
    data
  })
}

// 兑好礼
export function getPrizeList(data) {
  return request({
    url: '/wxYidouRewards/rewardslist',
    method: 'post',
    data
  })
}

// 查询所有任务列表
export function getTaskList(data) {
  return request({
    url: '/wxYidouRewards/tasklist',
    method: 'post',
    data
  })
}

// 每日任务
export function accomplishTask(data) {
  return request({
    url: '/YiDouManage/dailytasks',
    method: 'post',
    data
  })
}

// 提交反馈
export function submitOpinions(data) {
  return request({
    url: '/yidou/feedback',
    method: 'post',
    data
  })
}

// 获取个人信息
export function getMobileInfo(data) {
  return request({
    url: '/mobile/mobileinfo',
    method: 'post',
    data
  })
}

// 兑换奖励
export function cashRewards(data) {
  return request({
    url: '/YiDouManage/duihuan',
    method: 'post',
    data
  })
}
