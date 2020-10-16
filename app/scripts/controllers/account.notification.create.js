(function () {
    'use strict';
  
    angular
      .module('openSenseMapApp')
      .controller('AccountNotificationCreateController', AccountNotificationCreateController);
  
    AccountNotificationCreateController.$inject = ['boxes', 'AccountService', '$stateParams', '$state'];
  
    function AccountNotificationCreateController (boxes, AccountService, stateParams, $state) {
        var vm = this;
        vm.boxes = boxes;
        vm.selectedBox = [];
        vm.alerts = [];

        vm.selectedBoxId;
        vm.selectBox = selectBox;
        vm.createRule = createRule;
        vm.closeAlert = closeAlert;
        vm.deleteRule = deleteRule;

        vm.notificationRule = {active: false};
        
        
        if(stateParams.id && stateParams.box){
            AccountService.getNotificationRule(stateParams.box, stateParams.id)
                .then(function(rule){
                    rule.sensors = rule.sensors[0];
                    vm.notificationRule = rule;
                    selectBox();
                })
        }

        function selectBox() {
            vm.boxes.forEach(function(box) {
                if(box._id === vm.notificationRule.box){
                    vm.selectedBox = box;
                    return;
                }
            })
        }

        function createRule(){
            //add missing parameters for now until api is extended
            var rule = vm.notificationRule;
            rule.sensors = [ vm.notificationRule.sensors];
            rule.activationTrigger = 'any';
            rule.notificationChannel = [{ channel: 'email', email: 'xxx@ccsad.her' }];


            //IF stateparams ID update, otherwise create
            if(stateParams.id){
                AccountService.updateNotificationRule(rule)
                    .then(function (data) {
                        console.log('done', data);

                    })
                    .catch(function(e) {
                        console.log(e);
                    });
            } else {
                AccountService.addNotificationRule(rule)
                    .then(function (data) {
                        console.log('done', data);
                        $state.go('account.notifications');
                        // vm.alerts.push({ type: 'info', msg: 'Notification Created' });

    
                    })
                    .catch(function(e) {
                        console.log(e);
                        vm.alerts.push({ type: 'info', msg: e.message });
                    });
            }
        }

        function closeAlert (index) {
            vm.alerts.splice(index, 1);
        }

        function deleteRule(id){
            AccountService.deleteNotificationRule(id).then(function() {
                vm.alerts.push({ type: 'info', msg: 'NOTIFICATION_NOTIFICATIONRULE_DELETED' });
            })
            .catch(function () {
                vm.alerts.push({ type: 'danger', msg: 'NOTIFICATION_NOTIFICATIONRULE_DELETE_FAILED' });
            });

        }
    }
  })();
  