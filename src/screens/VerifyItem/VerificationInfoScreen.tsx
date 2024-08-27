import React from "react";
import { Image, View } from "react-native";
import { ContentAreaView } from "~/components/BaseAreaView/BaseAreaView";
import { BackButton } from "~/components/NavigationComponents";
import { DsTypoName } from "~/designSystem";
import { DsText, Header5 } from "~/designSystem/02-atoms/DsText/DsText";
import verifiedIcon from "~/assets/icons/verifiedIcon.png";

export default function VerificationInfoScreen() {
  return (
    <ContentAreaView>
      <BackButton />

      <Header5 bold style={{ marginBottom: 16, marginTop: 24 }}>
        Verification
      </Header5>
      <DsText gray style={{ marginBottom: 40 }}>
        {`Golisto takes a very serious approach to claiming ownership on all items listed on our marketplace.

We assess all items using a combination of machine learning and blockchain technology (Powered by Concordium) to ensure everything you buy is legit.

Look for an verification identifier on every item for sale.`}
      </DsText>

      <View
        style={{
          backgroundColor: "rgb(250, 248, 244)",
          padding: 16,
          borderRadius: 8,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={verifiedIcon}
            style={{
              height: 16,
              width: 14,
              marginRight: 8,
            }}
            resizeMode="contain"
          />
          <DsText variant={DsTypoName.LABEL}>Ownership Verified</DsText>
        </View>

        <DsText variant={DsTypoName.BODY} style={{ marginTop: 8 }} gray>
          This item has been ownership verified by our in-house team and trusted
          partners, so you can trust that seller have the item in possession.
        </DsText>
      </View>

      <Header5 bold style={{ marginBottom: 16 }}>
        Proof of ownership
      </Header5>
      <DsText gray style={{ marginBottom: 40 }}>
        Blockchain technology is the driving force behind our digital ownership
        verification strategy. Our technology reviews all the data that seller
        adds to claim ownership of an item before the token is minted and shown
        to the buyer.
      </DsText>

      <DsText variant={DsTypoName.LABEL} style={{ marginBottom: 16 }}>
        Ownership verification helps both buyers and sellers
      </DsText>
      <DsText gray style={{ marginBottom: 40 }}>
        Tagged photos help buyers trust you have the item in hand. A tagged
        photo is alwayes required when you want to claim ownership of an item.
        It proves you have the item in hand ensures that it will pass our
        moderation process.
      </DsText>

      <DsText variant={DsTypoName.LABEL} style={{ marginBottom: 16 }}>
        Why do we use tagged photos?
      </DsText>
      <DsText gray style={{ marginBottom: 40 }}>
        {`Tagged photos help buyers trust you have the item in hand. A tagged photo is alwayes required when you want to claim ownership of an item.

It proves you have the item in hand ensures that it will pass our moderation process. `}
      </DsText>
      <DsText variant={DsTypoName.LABEL} style={{ marginBottom: 16 }}>
        Why do we use item identifiers?
      </DsText>
      <DsText gray style={{ marginBottom: 40 }}>
        {`Item identifiers helps both buyer and seller to ensure that the physical item and the unique digital token matches up when a trade has been made. 

As opposed to new items entering the market where manufacturers can incorporate RFID tag, QR code, etc. we need to be able to identify that it is the exact item that is linked to its ownership token. By letting the seller document the item identifiers we are creating a footprint that is unique to that specific item.

This is a time efficient and easy way for both parts of the trade to have solid evidence of the item trading hands, bringing more transparency to the community.`}
      </DsText>
    </ContentAreaView>
  );
}
