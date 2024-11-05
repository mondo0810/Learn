package com.triquang.binance.request;

import com.triquang.binance.domain.VerificationType;

import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
	private String sendTo;
	private VerificationType verificationType;
}
