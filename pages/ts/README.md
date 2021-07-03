# 涂鸦智能 - 蓝牙智能跳绳 案例

当前 目录 为根据涂鸦蓝牙协议开发的蓝牙智能跳绳案例。

## 1. 开发基础

本案例的开发基于涂鸦小程序团队封装的 《 蓝牙SDK 》。

通过引入该 SDK ，开发者无需关心底层蓝牙协议，只需参照下文的api调用说明，即可简单轻松地完成蓝牙智能跳绳小程序的搭建。

## 2. api

### 2.1. 引用, 初始化api请求对象

- 说明
  
  蓝牙SDK 暴露了一个蓝牙基础业务处理实例，该实例维护了api请求对象与设备实例列表。

  ```js
  import { BleService } from '';

  BleService.initFunction(request)
  ```

### 2.2. 创建蓝牙设备实例

- 说明

  通过调用 BleService 中的方法获取设备实例(每个蓝牙设备对应一个实例)，连接状态等数据维护在该实例中。
  若当前设备 id 对应的实例已经被创建过，则会销毁原有实例，在此创建新的实例并返回。

- 示例

  ```js
  const instance = BleService.setNewInstance(devId, homeId);

  instance.set("_bleIotData", { _ble_dpCodeMap }) 
  ```

- 参数说明

  | 字段   | 数据类型 | 说明                |
  | :----- | :------- | :------------------ |
  | devId  | number   | 蓝牙设备 id         |
  | homeId | number   | 蓝牙设备所在家庭 id |
  | _ble_dpCodeMap | object | 蓝牙设备dpCode与 dp_id的映射关系 |

### 2.3. 获取已创建的实例

- 说明

  获取已创建过的设备实例。
  当该设备的蓝牙连接断开时，该实例会被销毁。

- 示例

  ```js
  const instance = BleService.instance[devId];
  if(!instance) reutrn false;
  ```

- 相关

  若想自主销毁某蓝牙实例，可按如下方式调用:
  ```js
  BleService.destroyInstance(devId);
  ```

* 参数说明

  | 字段  | 数据类型 | 说明        |
  | :---- | :------- | :---------- |
  | devId | number   | 蓝牙设备 id |

### 2.4. 与设备建立连接

- 说明

  小程序与设备建立蓝牙连接。
  当建立连接成功或失败时，会执行下文提到的回调事件。

* 示例

  ```js
  await instance.connectBlue();
  ```

### 2.5. 发送数据

- 说明

  小程序向设备发送数据。

- 示例

  ```js
  await instance.sendDp({ dpCode, dpValue });
  ```

- 参数说明

  | 字段   | 数据类型    | 说明                                    |
  | :----- | :---------- | :-------------------------------------- |
  | dpValue| number ｜ string ｜ bool | 数据                                    |
  | dpCode | any    | 上文提到的_ble_dpCodeMap中的dpCode |

- 注意事项

  蓝牙智能跳绳设备共有三种工作模式，分别为：自由跳，倒计时，倒计数。
  其中，倒计时模式下，用户可设置目标跳绳时间；倒计数模式下，用户则可设置目标跳绳个数。除这两个模式之外，都将无法设置目标个数or目标时间。
  因此，在下发 目标数dp 与 目标时间dp 这两个dp点前，需先设置设备工作模式，否则该dp点下发无法生效。
  （若dp下发生效，设备将会发出提示音。）

### 2.6. 注册回调事件

- 说明

  当设备连接状态改变，或接收到蓝牙数据时，会执行回调事件。

- 示例

  ```js
  instance.revicePackage(parseReceiveData => {
    const { type, status, dpState, deviceId } = parseReceiveData;

    if (type === 'connect' && status === 'fail') {
      // 连接失败 或 连接后又断开
    } else if (type === 'connect' && status === 'connected') {
      // 连接成功
    } else if (!(deviceId in parseReceiveData)) {
      // dp上报
      // something todo...
    }
  });
  ```

- 参数说明

  | 字段     | 数据类型    | 说明                                              |
  | :------- | :---------- | :------------------------------------------------ |
  | type     | string      | 状态类型：connect-连接状态,otaStatus-OTA 升级状态 |
  | status   | string      | 状态值               |
  | deviceId | string      | 蓝牙设备 id              |
  | dpState  | Object      | 蓝牙设备上报的数据包，表示设备当前功能与状态     |


### 2.7. ota 升级指令

- 说明

  发送设备 ota 升级的指令

- 示例

  ```js
  instance.sendOtaRequestOrder(url);
  ```

- 参数说明

  | 字段 | 数据类型 | 说明                       |
  | :--- | :------- | :------------------------- |
  | Url  | string   | 设备升级文件的下载地址 url |
