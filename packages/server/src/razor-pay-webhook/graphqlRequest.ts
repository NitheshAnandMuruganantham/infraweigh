export const getBillDetails = `
  query ($billByPkId: uuid!) {
    bill_by_pk(id: $billByPkId) {
      id
      vehicle_number
      created_at
      second_weight
      tare_weight
      charges
      photos
      reference_bill_id
      scale_weight
      tare_weight
      photos
      customer {
        id
        name
        company_address
        company_name
        gst_in
        metadata
        email
        phone
      }
      customer_2 {
        id
        name
        company_address
        company_name
        gst_in
        metadata
        email
        phone
      }
      customer_3 {
        id
        name
        company_address
        company_name
        gst_in
        email
        phone
        metadata
      }
      tenent {
        id
        razorpay_id
        email
        phone
        metadata
        name
      }
      vehicle {
        name
        id
        manufacturer
      }
      material {
        name
        id
        hsn
      }
      paid_by
      weighbridge {
        display_name
        id
        address
        pin_code
        phone
        logo
        metadata
        mail
        name
      }
    }
  }
`;

export const RazorPayWebhookMutation = `
  mutation updateBill(
    $pkColumns: bill_pk_columns_input!
    $set: bill_set_input
  ) {
    update_bill_by_pk(pk_columns: $pkColumns, _set: $set) {
      id
    }
  }
`;
