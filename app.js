const pdfForm = document.getElementById('pdf-form');
const pdfFile = document.getElementById('pdf-file');
const submitBtn = document.getElementById('submit-btn');
const textContainer = document.getElementById('text-container');
const summaryContainer = document.getElementById('summary');

pdfForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const reader = new FileReader();
  reader.readAsArrayBuffer(pdfFile.files[0]);

  reader.onload = async () => {
    const typedArray = new Uint8Array(reader.result);
    const pdfDoc = await pdfjsLib.getDocument({ data: typedArray }).promise;

    let text = '';
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ');
    }

    textContainer.innerText = text;

    // Send text to OpenAI API
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.openai.com/v1/completions", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Bearer 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");
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Extract the text completion from the API response
        const responseData = JSON.parse(this.responseText);
        const completion = responseData.choices[0].text;
                

                // Find the starting point using the index of the reference word
        const startIndex = completion.indexOf('{');

        // Use the substring() method to extract the text between the starting and ending points
        let extractedText = completion.substring(startIndex);
        // extractedText = "[" + extractedText.slice(1);
        // extractedText = extractedText.slice(0, -1) + "]";

        // console.log(JSON.parse(extractedText));
        const jsonDataFetched = JSON.parse(extractedText)

        const jsonData = [jsonDataFetched]
        
        console.log(jsonData[0].Confidentiality)

        
         // selecting the required DOM
      document.getElementById('partiesKeyPoints').textContent = jsonData[0].PartiesInvolved.keypoints || jsonData[0].PartiesInvolved.keyPoints || jsonData[0].PartiesInvolved.key_points
      document.getElementById('partiesRiskLevel').textContent = jsonData[0].PartiesInvolved.risklevel || jsonData[0].PartiesInvolved.riskLevel || jsonData[0].PartiesInvolved.risk_Level || jsonData[0].PartiesInvolved.risk_level || jsonData[0].PartiesInvolved.RiskLevel || jsonData[0].PartiesInvolved.Risklevel
      document.getElementById('partiesBenchmark').textContent = jsonData[0].PartiesInvolved.benchmark_to_risk_level_compared_to_similar_industry   

      document.getElementById('obligationsKeyPoints').textContent = jsonData[0].Obligations.keypoints || jsonData[0].Obligations.keyPoints || jsonData[0].Obligations.key_points
      document.getElementById('obligationsRiskLevel').textContent = jsonData[0].Obligations.risklevel || jsonData[0].Obligations.riskLevel || jsonData[0].Obligations.risk_Level || jsonData[0].Obligations.risk_level || jsonData[0].Obligations.RiskLevel || jsonData[0].Obligations.Risklevel
      document.getElementById('obligationsBenchmark').textContent = jsonData[0].Obligations.benchmark_to_risk_level_compared_to_similar_industry

      document.getElementById('paymentTermsKeyPoints').textContent = jsonData[0].PaymentTerms.keypoints || jsonData[0].PaymentTerms.keyPoints || jsonData[0].PaymentTerms.key_points
      document.getElementById('paymentTermsRiskLevel').textContent = jsonData[0].PaymentTerms.risklevel || jsonData[0].PaymentTerms.riskLevel || jsonData[0].PaymentTerms.risk_Level || jsonData[0].PaymentTerms.risk_level || jsonData[0].PaymentTerms.RiskLevel || jsonData[0].PaymentTerms.Risklevel
      document.getElementById('paymentTermsBenchmark').textContent = jsonData[0].PaymentTerms.benchmark_to_risk_level_compared_to_similar_industry

      document.getElementById('terminationKeyPoints').textContent = jsonData[0].Termination.keypoints || jsonData[0].Termination.keyPoints || jsonData[0].Termination.key_points
      document.getElementById('terminationRiskLevel').textContent = jsonData[0].Termination.risklevel || jsonData[0].Termination.riskLevel || jsonData[0].Termination.risk_Level || jsonData[0].Termination.risk_level || jsonData[0].Termination.RiskLevel || jsonData[0].Termination.Risklevel
      document.getElementById('terminationBenchmark').textContent = jsonData[0].Termination.benchmark_to_risk_level_compared_to_similar_industry

      document.getElementById('intellectualPropertyKeyPoints').textContent = jsonData[0].IntellectualProperty.keypoints || jsonData[0].IntellectualProperty.keyPoints || jsonData[0].IntellectualProperty.key_points
      document.getElementById('intellectualPropertyRiskLevel').textContent = jsonData[0].IntellectualProperty.risklevel || jsonData[0].IntellectualProperty.riskLevel || jsonData[0].IntellectualProperty.risk_Level || jsonData[0].IntellectualProperty.risk_level || jsonData[0].IntellectualProperty.RiskLevel || jsonData[0].IntellectualProperty.Risklevel
      document.getElementById('intellectualPropertyBenchmark').textContent = jsonData[0].IntellectualProperty.benchmark_to_risk_level_compared_to_similar_industry

      document.getElementById('confidentialityKeyPoints').textContent = jsonData[0].Confidentiality.keypoints || jsonData[0].Confidentiality.keyPoints || jsonData[0].Confidentiality.key_points
      document.getElementById('confidentialityRiskLevel').textContent = jsonData[0].Confidentiality.risklevel || jsonData[0].Confidentiality.riskLevel || jsonData[0].Confidentiality.risk_Level || jsonData[0].Confidentiality.risk_level || jsonData[0].Confidentiality.RiskLevel || jsonData[0].Confidentiality.Risklevel
      document.getElementById('confidentialityBenchmark').textContent = jsonData[0].Confidentiality.benchmark_to_risk_level_compared_to_similar_industry

      document.getElementById('governingLawKeyPoints').textContent = jsonData[0].GoverningLaw.keypoints || jsonData[0].GoverningLaw.keyPoints || jsonData[0].GoverningLaw.key_points
      document.getElementById('governingLawRiskLevel').textContent = jsonData[0].GoverningLaw.risklevel || jsonData[0].GoverningLaw.riskLevel || jsonData[0].GoverningLaw.risk_Level || jsonData[0].GoverningLaw.risk_level || jsonData[0].GoverningLaw.RiskLevel || jsonData[0].GoverningLaw.Risklevel
      document.getElementById('governingLawBenchmark').textContent = jsonData[0].GoverningLaw.benchmark_to_risk_level_compared_to_similar_industry
      
        // Update the summary div with the API response
        // summaryContainer.innerText = extractedText;
        summaryContainer.style.display = 'block';
      }
    };
    xhr.send(JSON.stringify({
      "model": "text-davinci-003",
      "prompt": `Create a json summarizing the key information of the legal contract in the following categories: PartiesInvolved, Obligations, PaymentTerms, Termination, IntellectualProperty, Confidentiality, Governing Law. For each category, include the key points, risklevel (L, M, H), and benchmark_to_risk_level_compared_to_similar_industry\n${text}`,
      "temperature": 0.7,
      "max_tokens": 1024,
      "top_p": 1
    }));
  };
});



  






