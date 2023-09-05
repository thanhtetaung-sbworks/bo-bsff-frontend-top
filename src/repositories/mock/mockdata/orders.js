/**
 * 着信認証 mockデータ
 */
const mockData = {
  /**
   * 着信認証番号を取得
   */
  postOstiariesNewTransaction() {
    return {
      data: {
        command: "NewTransaction",
        version: "2.0",
        timestamp: "2021-11-16T11:12:58.120+09:00",
        response: "failure",
        customerNumber: "0363842506",
        error: {
          code: 200,
          message: "Remote address is not acceptable."
        },
        // result: null
        result: {
          transactionId: "34392751-4212-4889-b220-4bb4738a89c8",
          createdAt: "2021-10-18T10:35:57.897+09:00",
          expiresAt: "2021-10-18T10:35:57.897+09:00",
          authenticNumber: "0800000000"
        }
      }
      // data: {
      //   command: "NewTransaction",
      //   version: "2",
      //   timestamp: "2021-10-18T10:35:57.891+09:00",
      //   response: "success",
      //   customerNumber: "000-0000-0000",
      //   error: {
      //     code: 500,
      //     message: "Required XX param",
      //   },
      //   result: {
      //     transactionId: "34392751-4212-4889-b220-4bb4738a89c8",
      //     createdAt: "2021-10-18T10:35:57.897+09:00",
      //     expiresAt: "2021-10-18T10:35:57.897+09:00",
      //     authenticNumber: "0000-00-0000",
      //   },
      // },
    };
  },
  /**
   * 着信認証を開始
   */
  postOstiariesStartAuthentication(params) {
    // return {
    //   data: {
    //     transactionId: "34392751-4212-4889-b220-4bb4738a89c8",
    //   },
    // };
    return {
      data: {
        command: "NewTransaction",
        version: "2",
        timestamp: "2021-10-18T10:35:57.891+09:00",
        response: "success",
        error: {
          code: 200,
          message: "Required XX param"
        },
        result: {
          transactionId: params.transactionId,
          status: "started"
        }
      }
    };
  },
  /**
   * デジチケ・デジポンの申込確認
   */
  getOrderConfirm1() {
    return {
      data: {
        applicationData: {
          catLrgClassNm: "生活",
          imageUrl:
            "https://d3ig3lhuz4sci5.cloudfront.net/img/652212_00012.jpg",
          menuNo: "10652212",
          menuNm: "EdyギフトID",
          planNm:
            "【後日配信】デジタルクーポンコードでEdyギフトID5000円分 5000円⇒4990円"
        },
        memberBenefits: [
          {
            benefitHeading: "【デジタルチケット】",
            benefitContent: "【初回限定】",
            applWinDispDiv: "9",
            reserveQty: 1
          },
          {
            benefitHeading:
              "【デジタルクーポンコード】EdyギフトID5,000円分 5,000円 ⇒",
            benefitContent: "4,990円",
            applWinDispDiv: "1",
            reserveQty: 1
          },
          {
            benefitHeading: "ベネポ10％",
            benefitContent: "プレゼント！",
            applWinDispDiv: "2",
            reserveQty: 1
          }
        ],
        appLimits: [
          {
            usageLimitCont:
              "こちらの特典は、2020/04/01～2022/03/31の期間に、ご家族含むご本人様のお客様番号につき100枚までのお申込みとなります。"
          },
          {
            usageLimitCont: "1回にお申込み可能な数量は100までとなります。"
          }
        ],
        noteMatters: [
          {
            content: "string"
          }
        ],
        canSubsidy: true,
        applicantInfo: {
          torinoMemberNo: "string",
          familyName: "ベネフィット",
          firstName: "太郎",
          familyNameKana: "ベネフィット",
          firstNameKana: "タロウ",
          mail: "abc@abc.com",
          tel: "03-0000-0000"
        },
        subTotal: 11300,
        subsidyAmountTotal: 0,
        billingAmount: 11300,
        fixedAmount: 0,
        benepoReturnFixed: 100,
        grantedBenepo: null,
        optinFlag: "string",
        optins: [
          {
            documentId: "sukusuku_normal-0005",
            documentNm: "個人情報の第三者提供等に関するご同意について",
            documentUrl: "https://bs.benefit-one.co.jp/BE-ONE/aply/bs.html"
          }
        ],
        mailMagazineTitleList: [
          {
            id: "0",
            title: "選択肢"
          },
          {
            id: "9999",
            title: "選択肢2"
          },
          {
            id: "00000",
            title: "選択肢3"
          },
          {
            id: "888888888",
            title: "選択肢4"
          }
        ],
        mailMagazineIsSubscribeList: [
          {
            id: 0,
            isSubscribe: true
          }
        ]
      }
    };
  },
  getOrderConfirm2() {
    return {
      data: {
        applicationData: {
          catLrgClassNm: "育児",
          imageUrl: "https://d3ig3lhuz4sci5.cloudfront.net/img/640398.jpg",
          menuNo: "10640398",
          menuNm: "すくすく倶楽部新規登録プラン",
          planNm:
            "すくすく倶楽部新規登録プラン【ゴールドコース　※1日制限なし　30時間/月】"
        },
        memberBenefits: [
          {
            memberBenefitsId: "871835",
            tixSendWay: "01" //チケット発送方法 (01:通常 02:追跡便)
          }
        ],
        appLimits: null,
        noteMatters: null,
        canSubsidy: true,
        applicantInfo: {
          torinoMemberNo: "1",
          familyName: "family",
          firstName: "first",
          familyNameKana: "family",
          firstNameKana: "first",
          mail: "hanako.tanaka@foobar.com",
          tel: "09012345678",
          defaultDestination: 1,
          addresses: [
            {
              postalCode: "100-0005",
              prefectureCode: 13,
              address1: "東京都千代田区丸の内",
              address2: "どこかのビル 0階"
            },
            {
              postalCode: "6008389",
              prefectureCode: 26,
              address1: "京都府京都市下京区四条大宮町",
              address2: null
            }
          ]
        },
        subTotal: 0,
        subsidyAmountTotal: 0,
        billingAmount: 0,
        grantedBenepo: 180,
        optinFlag: "1",
        benepoReturnDiv: "1",
        benepoReturnFixed: 1000,
        optins: [
          {
            documentId: "sukusuku_normal-0005",
            documentNm: "個人情報の第三者提供等に関するご同意について",
            documentUrl: "https://bs.benefit-one.co.jp/BE-ONE/aply/bs.html"
          }
        ],
        applInfo: {
          sendItemTypeDiv: "1" // 送付物種類区分 (1:興行チケット 2:金券 3:利用券 4:優待券)
        },
        mailMagazineTitleList: [
          {
            id: "0",
            title: "選択肢"
          }
        ],
        mailMagazineIsSubscribeList: [],
        questions: [
          {
            qstnId: "0000000001",
            qstnCont: "（現在妊娠中の方）出産予定日",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "4",
            maxValue: 20220331,
            minValue: 20210225,
            regexp: null,
            asgCd: null,
            altnvList: null
          },
          {
            qstnId: "0000000002",
            qstnCont: "【登録1】お子様の氏名（全角）",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "1",
            maxValue: 6,
            minValue: 5,
            regexp: "^.*$",
            asgCd: null,
            altnvList: null
          },
          {
            qstnId: "0000000003",
            qstnCont: "【登録1】お子様の氏名（全角ふりがな）",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "1",
            maxValue: 2000,
            minValue: null,
            regexp: "^.*$",
            asgCd: null,
            altnvList: null
          },
          {
            qstnId: "0000000004",
            qstnCont: "【登録1】お子様の性別",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "7",
            maxValue: null,
            minValue: null,
            regexp: null,
            asgCd: null,
            altnvList: [
              {
                altnvId: "1",
                altnvCont: "男"
              },
              {
                altnvId: "2",
                altnvCont: "女"
              }
            ]
          },
          {
            qstnId: "0000000005",
            qstnCont: "【登録1】お子様の年齢",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "5",
            maxValue: null,
            minValue: null,
            regexp: null,
            asgCd: null,
            altnvList: [
              {
                altnvId: "1",
                altnvCont: "0"
              },
              {
                altnvId: "2",
                altnvCont: "1"
              },
              {
                altnvId: "3",
                altnvCont: "2"
              },
              {
                altnvId: "4",
                altnvCont: "3"
              },
              {
                altnvId: "5",
                altnvCont: "4"
              },
              {
                altnvId: "6",
                altnvCont: "5"
              },
              {
                altnvId: "7",
                altnvCont: "6"
              },
              {
                altnvId: "8",
                altnvCont: "7"
              },
              {
                altnvId: "9",
                altnvCont: "8"
              },
              {
                altnvId: "10",
                altnvCont: "9"
              },
              {
                altnvId: "11",
                altnvCont: "10"
              },
              {
                altnvId: "12",
                altnvCont: "11"
              },
              {
                altnvId: "13",
                altnvCont: "12 歳"
              }
            ]
          },
          {
            qstnId: "0000000006",
            qstnCont: "【登録1】お子様の生年月日",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "4",
            maxValue: 20990331,
            minValue: 20080301,
            regexp: null,
            asgCd: null,
            altnvList: null
          },
          {
            qstnId: "0000000007",
            qstnCont:
              "【登録1】会員本人様との続柄(必須)※その他の場合、カスタマーセンーターより確認の連絡をいたします",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "6",
            maxValue: null,
            minValue: null,
            regexp: null,
            asgCd: null,
            altnvList: [
              {
                altnvId: "1",
                altnvCont: "会員本人の子"
              },
              {
                altnvId: "2",
                altnvCont: "会員本人の孫"
              },
              {
                altnvId: "3",
                altnvCont: "その他"
              }
            ]
          },
          {
            qstnId: "0000000007",
            qstnCont: "証明書1",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "8",
            maxValue: null,
            minValue: null,
            regexp: null,
            asgCd: null,
            altnvList: []
          },
          {
            qstnId: "0000000008",
            qstnCont: "証明書2",
            antonCont: null,
            replyIdpsbFlag: "0",
            replyMthdDiv: "8",
            maxValue: null,
            minValue: null,
            regexp: null,
            asgCd: null,
            altnvList: []
          }
        ],
        payMthdInfo: {
          shipping: 300,
          benepoUseFlag: "1",
          payeeDiv: "10"
        },
        pointExchg: {
          pointExchgTxtGuidance:
            "1 130ベネポから100楽天ポイントへ交換できます。", // ポイント交換テキスト案内
          pointType: "07", // ポイント種別
          pointUnit: 130, // ポイント単位数
          minPointNum: 130, // 下限ポイント数
          pointRate1: 100, // ポイントレート1(分子)
          pointRate2: 130, // ポイントレート2(分母)
          params: [
            {
              paramId: "pci",
              paramValue: "BNE268"
            },
            {
              paramId: "pcd",
              paramValue: "240101"
            },
            {
              paramId: "phc",
              paramValue: "f4gijThSUEdRnvErOUGDU2Vh1K1Rho8VjAnsjVl1DqLSw6tNRg"
            }
          ] // ※ ポイント種別01～06のときジープラン認証用(picとpcd)、07のときLINE認証用(pid)が定義される
        },
        cautions: [
          {
            title: "注意事項1",
            content:
              "注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容注意事項内容",
            linkUrl: "xxxxx/xxxxx/xxxxxx",
            linkNm: "注意事項リンク"
          },
          {
            title: "注意事項2",
            content: "注意事項内容",
            linkUrl: "xxxxx/xxxxx/xxxxxx",
            linkNm: "注意事項リンク"
          }
        ]
      }
    };
  },
  /**
   * モーダル補助クーポン申請
   */
  getSubsidy() {
    return {
      data: {
        planImages: [
          {
            imageUrl: "https://mn.tst.boimg.jp/img/000161/16169.jpg",
            imageExplanation: ""
          }
        ],
        menuNm: "nanacoギフト",
        planNm: "【後日配信】デジタルクーポンコードで1000円分 1000円⇒990円",
        memberBenefits: [
          {
            benefitContent: "990円",
            reserveQty: 2
          },
          {
            benefitContent: "990円",
            reserveQty: 30
          }
        ],
        subTotal: 1980,
        availableDataList: [
          {
            availableData: {
              subsidyId: "B000000173",
              subsidyDetailId: "D000000301",
              dispSubsidyNm: "補助金名テスト11",
              priceList: [
                {
                  price: 3000,
                  subsidyDetailId: "D000000301",
                  subsidyPriceId: "P000000311"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "01",
              remainingCount: 2,
              qtyData: {
                numOfSheet: 2,
                subTotal: 3000 * 2
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 5
          },
          // {
          //   availableData: {
          //     subsidyId: "B000000057",
          //     subsidyDetailId: "D000000306",
          //     dispSubsidyNm: "年度更新用001",
          //     priceList: [
          //       {
          //         price: 13,
          //         subsidyDetailId: "D000000306",
          //         subsidyPriceId: "P000000317"
          //       }
          //     ],
          //     useStopFlg: "0",
          //     usedFormDiv: "01",
          //     remainingCount: 2,
          //     qtyData: {
          //       numOfSheet: 2,
          //       subTotal: 13 * 2
          //     },
          //     costUnderChargeableFlg: 0
          //   },
          //   remainingCount: null
          // },
          // {
          //   availableData: {
          //     subsidyId: "B000000058",
          //     subsidyDetailId: "D000000335",
          //     dispSubsidyNm: "年度更新用002",
          //     priceList: [
          //       {
          //         price: 13,
          //         subsidyDetailId: "D000000335",
          //         subsidyPriceId: "P000000347"
          //       }
          //     ],
          //     useStopFlg: "0",
          //     usedFormDiv: "01",
          //     remainingCount: 2,
          //     qtyData: {
          //       numOfSheet: 2,
          //       subTotal: 13 * 2
          //     },
          //     costUnderChargeableFlg: 0
          //   },
          //   remainingCount: null
          // },
          {
            availableData: {
              subsidyId: "B000000219",
              subsidyDetailId: "D000000368",
              dispSubsidyNm: "レジャー・エンタメ補助1",
              priceList: [
                {
                  price: 1000,
                  subsidyDetailId: "D000000368",
                  subsidyPriceId: "P000000378"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "01",
              remainingCount: 2,
              qtyData: {
                numOfSheet: 2,
                subTotal: 1000 * 2
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 1000
          },
          {
            availableData: {
              subsidyId: "B000000220",
              subsidyDetailId: "D000000369",
              dispSubsidyNm: "レジャー・エンタメ補助2",
              priceList: [
                {
                  price: "500",
                  subsidyDetailId: "D000000369",
                  subsidyPriceId: "P000000379"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "02",
              remainingCount: 100,
              qtyData: {
                numOfSheet: 2,
                subTotal: 500 * 2
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 1000
          },
          {
            availableData: {
              subsidyId: "B000000220",
              subsidyDetailId: "D000000369",
              dispSubsidyNm: "レジャー・エンタメ補助2",
              priceList: [
                {
                  price: "600",
                  subsidyDetailId: "D000000370",
                  subsidyPriceId: "P000000380"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "02",
              remainingCount: 100,
              qtyData: {
                numOfSheet: 2,
                subTotal: 600 * 2
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 1000
          },
          // {
          //   availableData: {
          //     subsidyId: "B000000220",
          //     subsidyDetailId: "D000000369",
          //     dispSubsidyNm: "レジャー・エンタメ補助3",
          //     priceList: [
          //       {
          //         price: 500,
          //         subsidyDetailId: "D000000369",
          //         subsidyPriceId: "P000000379"
          //       }
          //     ],
          //     useStopFlg: "0",
          //     usedFormDiv: "01",
          //     remainingCount: 100,
          //     qtyData: {
          //       numOfSheet: 1,
          //       subTotal: 500 * 1
          //     },
          //     costUnderChargeableFlg: 0
          //   },
          //   remainingCount: 1000
          // },
          {
            availableData: {
              subsidyId: "B000000220",
              subsidyDetailId: "D000000369",
              dispSubsidyNm: "レジャー・エンタメ補助3",
              priceList: [
                {
                  price: 300,
                  subsidyDetailId: "D000000369",
                  subsidyPriceId: "P000000379"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "01",
              remainingCount: 100,
              qtyData: {
                numOfSheet: 1,
                subTotal: 300 * 1
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 1000
          },
          {
            availableData: {
              subsidyId: "B000000221",
              subsidyDetailId: "D000000377",
              dispSubsidyNm: "補助（Wリスト）",
              priceList: [
                {
                  price: 2000,
                  subsidyDetailId: "D000000377",
                  subsidyPriceId: "P000000380"
                }
              ],
              useStopFlg: "0",
              usedFormDiv: "01",
              remainingCount: 1,
              qtyData: {
                numOfSheet: 1,
                subTotal: 2000 * 1
              },
              costUnderChargeableFlg: 0
            },
            remainingCount: 5
          }
        ],
        subsidyAmountTotal: 100064504,
        billingAmount: -100062524
      }
    };

    // return {
    //   data: {
    //     planImages: [
    //       {
    //         imageUrl: "https://mn.tst.boimg.jp/img/000161/16169.jpg",
    //         imageExplanation: ""
    //       }
    //     ],
    //     menuNm: "nanacoギフト",
    //     planNm: "【後日配信】デジタルクーポンコードで1000円分 1000円⇒990円",
    //     memberBenefits: [
    //       {
    //         benefitContent: "990円",
    //         reserveQty: 1
    //       },
    //       {
    //         benefitContent: "990円",
    //         reserveQty: 1
    //       }
    //     ],
    //     subTotal: 990,
    //     availableDataList: [
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 200,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 200
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 500,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 500
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 100,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 100
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 300,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 300
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 400,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 400
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 50,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 50
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 50,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "01",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 50
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       ////////////////////////////////////////
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 200,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 200
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 500,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 500
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 100,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 100
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 300,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 300
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 400,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 400
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 50,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 50
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       },
    //       {
    //         availableData: {
    //           subsidyId: "B000000208",
    //           subsidyDetailId: "D000000347",
    //           dispSubsidyNm: "生活2",
    //           priceList: [
    //             {
    //               price: 50,
    //               subsidyDetailId: "D000000347",
    //               subsidyPriceId: "P000000359"
    //             }
    //           ],
    //           useStopFlg: "0",
    //           usedFormDiv: "02",
    //           remainingCount: 96,
    //           qtyData: {
    //             numOfSheet: 1,
    //             subTotal: 50
    //           },
    //           costUnderChargeableFlg: 0
    //         },
    //         remainingCount: 96
    //       }
    //     ],
    //     subsidyAmountTotal: 200,
    //     billingAmount: 790
    //   }
    // };
  },
  /**
   * 受付明細番号採番
   */
  postAcceptanceDetailNumber() {
    return {
      acptDtlNo: "XXXXX"
    };
  },
  /**
   * 支払い無しで、支払方法選択処理
   */
  putComplete(param) {
    return {
      data: {
        acptNo: "211213000899",
        info: {
          planImages: [
            {
              imageUrl: "https://mn.tst.boimg.jp/img/0078/7855.jpg",
              imageExplanation: ""
            }
          ],
          menuNo: "10625152",
          menuNm: "コナミスポーツクラブ",
          planNm:
            "【決済後即時受取】デジタルチケットで施設利用券 16歳以上 最大2420円⇒1870円"
        },
        memberBenefits: [
          {
            benefitContent: "1,870円",
            reserveQty: 1,
            benefitHeading:
              "【デジタルチケット】コナミスポーツクラブ施設利用券（16歳以上） 2,420円 ⇒"
          }
        ],
        billingAmount: 1870,
        grantedBenepo: 0
      }
      // data: {
      //   acptNo: "210920123456",
      //   info: {
      //     planImages: [
      //       {
      //         imageUrl:
      //           "https://d3ig3lhuz4sci5.cloudfront.net/img/652212_00012.jpg",
      //       },
      //     ],
      //     menuNo: "10652212",
      //     menuNm: "EdyギフトID",
      //     planNm:
      //       "【後日配信】デジタルクーポンコードでEdyギフトID5000円分 5000円⇒4990円",
      //   },
      //   memberBenefits: [
      //     {
      //       benefitHeading: "【デジタルチケット】",
      //       benefitContent: "【初回限定】",
      //       applWinDispDiv: "9",
      //       reserveQty: 1,
      //     },
      //     {
      //       benefitHeading:
      //         "【デジタルクーポンコード】EdyギフトID5,000円分 5,000円 ⇒",
      //       benefitContent: "4,990円",
      //       applWinDispDiv: "1",
      //       reserveQty: 1,
      //     },
      //     {
      //       benefitHeading: "ベネポ10％",
      //       benefitContent: "プレゼント！",
      //       applWinDispDiv: "2",
      //       reserveQty: 1,
      //     },
      //     // {
      //     //   benefitContent: "4,990円",
      //     //   reserveQty: 0,
      //     // },
      //   ],
      //   billingAmount: 5000,
      //   grantedBenepo: 200,
      // },
    };
  },
  /**
   * 保有しているベネポの取得
   */
  getPoint() {
    return {
      totalPoint: 600, //所持ポイント合計
      noUseLimitPoint: 500, //使用制限なしポイント
      useLimitPoint: 0, //使用制限ありポイント
      grantedPoint: 0, //付与予定ポイント
      useLimitPointList: [
        {
          useLimitCode: "xxxxxx",
          point: 100
        }
      ] //使用制限別ポイントリスト
    };
  },
  getPoint2() {
    const data = `{
        "totalPoint": 943095,
        "noUseLimitPoint": 943095,
        "useLimitPoint": 0,
        "grantedPoint": 0,
        "useLimitPointList": []
      }`
    return {
      data: JSON.parse(data),
    }
  },
  /**
   * 保有しているベネポの取得
   */
  putAddress() {
    const data = `{
      "defaultDestination": null,
      "addresses": [
        {
          "postalCode": "1000004",
          "prefectureCode": 13,
          "address1": "東京都千代田区大手町二丁目6番2号",
          "address2": "JOB HUB SQUARE9階"
        }
      ]
    }`;
    return {
      data: JSON.parse(data),
    }
  }
};
export default mockData;
