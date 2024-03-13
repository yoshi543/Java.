package com.design_shinbi.shindan.servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.design_shinbi.shindan.model.Shindan;

@WebServlet("/top")
public class TopServlet extends HttpServlet {
	@Override
	protected void doGet(
			HttpServletRequest req,
			HttpServletResponse resp) throws ServletException, IOException {
		HttpSession session = req.getSession();

		Shindan shindan = new Shindan();
		req.setAttribute("shindan", shindan);
		session.setAttribute("shindan", shindan);

		RequestDispatcher dispatcher = req.getRequestDispatcher("/WEB-INF/jsp/top.jsp");
		dispatcher.forward(req, resp);
	}
}
