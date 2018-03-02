import { OdnTweetData, OdnTweets } from "../../../odnTweets"
import { OdnPlugins, OdnPluginResultData } from "../../../odnPlugins";
import {Log, OdnUtils} from "../../../odnUtils";

export class Yodobashi {
  constructor(private tweetData: OdnTweetData, private fullName: string) {}

  /**
   * プラグインのメイン処理を実行
   *
   * @param {(isProcessed?: boolean) => void} finish
   */
  run(finish: (isProcessed?: boolean) => void) {
    const tweets = new OdnTweets(this.tweetData.accountData);
    tweets.text = Resources.getYodobashiMessage();
    // リプライの場合は、リプライ先ツイートのIDをセット
    tweets.targetTweetId = this.tweetData.idStr;

    // ツイートを投稿
    tweets.postTweet((isSuccess) => {
      tweets.likeTweet();
      finish();
    });
  }

  /**
   * プラグインを実行するかどうか判定
   *
   * @param {OdnTweetData} tweetData
   * @returns {boolean}
   */
  static isValid(tweetData: OdnTweetData): boolean {
    return false === tweetData.isRetweet && tweetData.text.match(/^.*(ヨドバシ|ﾖﾄﾞﾊﾞｼ).*$/gi) ? true : false;
  }
}


class Resources {
  private static yodobashiList: Array<string> = [
    "\\ﾍｲﾗｯｼｬｲ/Welcome toヨォドォバァシィ🚇。亲爱❤️顾客👬、你们好😃。🙏衷心欢迎您🙏🚃。🚌是🇯🇵著名📢大型👛🏬。📱商品👏近一百🗻、数📷机、摄📹、名牌💰⌚️、化💄👩、电子🎮、💸箱包👜等应有尽有。最新👗款式、最优👍的💴、最优🍺质👔🍻。",
    "Welcome to ヨォドォバァシィカァメェラ。亲爱的顾客朋友、你们好。衷心欢迎您光临友都八喜。友都八喜是日本著名的大型购物中心。精明商品将近一百万种、数码相机、摄像机、名牌手表、化妆品、电子游戏、名牌箱包等应有尽有。最新的款式、最优惠的价格、最优质的服务。"
  ];

  /**
   * 設定済みのヨドバシメッセージからランダムで取得
   *
   * @returns {string}
   */
  static getYodobashiMessage(): string {
    const index = OdnUtils.rand(0, this.yodobashiList.length - 1);
    return this.yodobashiList[index];
  }
}