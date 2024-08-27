export type VerificationObject = {
  item: any;
  taggedPhoto: string; // base64
  documents: {
    proofOfPurchase?: string[];
    barcode?: string;
    serialNumber?: string;
    stamps?: {
      images: string[];
      text: string;
    };
    gradingInfo?: {
        grader: string;
        grade: string
    };
    others?: {
      images: string[];
      text: string;
    };
  };
  identifiers: string[];
};
